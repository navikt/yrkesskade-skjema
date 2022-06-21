import { Express, NextFunction, Response, Request } from "express";
import config from "../config";
import { isEnabled } from "../featureflag/unleash";
import { ToggleKeys } from '../../client/src/types/feature-toggles';
import { Brukerinfo, Organisasjon } from '../../client/src/types/brukerinfo';
import axios from "axios";
import { logError, logInfo } from '@navikt/yrkesskade-logging';
import { Context } from "unleash-client";
import clientRegistry from '@navikt/yrkesskade-backend/dist/auth/clientRegistry';
import { TokenSet } from 'openid-client';
import { utledAudience, ensureAuthenticated } from '@navikt/yrkesskade-backend/dist/auth/tokenUtils';
import { exchangeToken } from '@navikt/yrkesskade-backend/dist/auth/tokenX';
import { serviceConfig } from '../serviceConfig'
import { v4 as uuidv4 } from 'uuid';

const toggleFetchHandler = (req, res) => {
  const toggleId = req.params.id;
  if (!toggleId) {
    res.status(404).send('Mangler toggle-id')
  }
  res.send(isEnabled(toggleId, byggContextFraRequest(req)));
};

export const configureFeatureTogglesEndpoint = (app: Express): Express => {
  // Matcher bare toggles som tilhører oss, bruker {0,} pga en express-quirk
  // ref http://expressjs.com/en/guide/routing.html#route-parameters
  app.get(`${config.BASE_PATH}/toggles/:id(yrkesskade.[a-zA-Z-]{0,})`,ensureAuthenticated, attachTokenX, hentBrukerinfo, toggleFetchHandler);
  return app;
};

const attachTokenX = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const klient = clientRegistry.getClient('tokenX');
  const audience = utledAudience(serviceConfig.find(config => config.id === 'yrkesskade-melding-api'));
  exchangeToken(klient, audience, req)
    .then((tokenSet: TokenSet) => {
      req.headers['Nav-Call-Id'] = uuidv4();
      req.headers.Authorization = `Bearer ${tokenSet.access_token}`;
      return next();
    })
    .catch((e) => {
      logError(`Uventet feil - exchangeToken`, e);
      res.status(500).json({
        status: 'FEILET',
        melding: 'Uventet feil. Vennligst prøv på nytt.',
      });
    });
};


const hentBrukerinfo = async (req, res: Response, next: NextFunction) => {
  const service = serviceConfig.find(config => config.id === 'yrkesskade-melding-api');

  try {
    const response = await axios.get<Brukerinfo>(`${service.proxyUrl}/api/v1/brukerinfo`, {
      headers: req.headers,
    });

    if (response.status === 200) {
      req.data = response.data;
    }
  } catch (error) {
    logError(`Kunne ikke hente bruker info fra ${service.proxyUrl}/api/v1/brukerinfo`, error);
    res.sendStatus(400);

    return;
  }

  next()
}

const fetchAllFeatureTogglesHandler = (req, res) => {
  const context = byggContextFraRequest(req);
  res.send(Object.keys(ToggleKeys).reduce((keys, key) => ({ ...keys, [key]: isEnabled(ToggleKeys[key], context)}), {}));
};

const byggContextFraRequest = (req) => {
  const context: Context = {
    appName: process.env.NAIS_APP_NAME ?? 'yrkesskade-skjema',
    environment: process.env.NODE_ENV,
    userId: req.data?.fnr || '',
    properties: {}
  }

  logInfo('Sjekk organisasjoner: ', req.data.organisasjoner);

  if (req.data?.fnr) {
    // legg på properties dersom vi har fnr i request
    context.properties = {
      ...context.properties,
      'organisasjonsnumre': req.data.organisasjoner.map(organisasjon => organisasjon.organisasjonsnummer).join(','),
      'naeringskoder': req.data.organisasjoner
        .filter((organisasjon: Organisasjon) => !!organisasjon.naeringskode)
        .map((organisasjon: Organisasjon) => organisasjon.naeringskode)
        .join(','),
      'antallAnsatte': Math.max.apply(Math, req.data.organisasjoner.map((organisasjon: Organisasjon) =>  organisasjon.antallAnsatte )),
      'organisasjonsformer': req.data.organisasjoner
        .filter((organisasjon: Organisasjon) => !!organisasjon.organisasjonsform)
        .map((organisasjon: Organisasjon) => organisasjon.organisasjonsform)
        .join(','),
    }
  }

  return context;
}

export const konfigurerAllFeatureTogglesEndpoint = (app: Express): Express => {
  app.get(`${config.BASE_PATH}/toggles/`, ensureAuthenticated, attachTokenX, hentBrukerinfo, fetchAllFeatureTogglesHandler);
  return app;
};
