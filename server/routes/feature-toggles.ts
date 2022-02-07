import { Express } from "express";
import config from "../config";
import { isEnabled } from "../featureflag/unleash";
import { ToggleKeys } from '../../client/src/types/feature-toggles';
import { Brukerinfo, Organisasjon } from '../../client/src/types/brukerinfo';
import axios, { AxiosError } from "axios";

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
  app.get(`${config.BASE_PATH}/toggles/:id(yrkesskade.[a-zA-Z-]{0,})`, hentBrukerinfo, toggleFetchHandler);
  return app;
};

const hentBrukerinfo = async (req,res,next) => {
  // bruk rett cookie name
  const cookieName = config.IDPORTEN_COOKIE_NAME;

  // hent token fra cookie
  const loginserviceToken = req.cookies[cookieName];
  try {
    const response = await axios.get<Brukerinfo>(`${config.API_URL}/api/v1/brukerinfo`, {
      headers: {
        // bruk cookie i kall mot api
        Cookie: `${cookieName}=${loginserviceToken}`
    }
    });

    if (response.status === 200) {
      req.data = response.data;
    }
  } catch (error) {
    console.log(error);
  }

  next()
}

const fetchAllFeatureTogglesHandler = (req, res) => {

  res.send(Object.keys(ToggleKeys).reduce((keys, key) => ({ ...keys, [key]: isEnabled(ToggleKeys[key], byggContextFraRequest(req))}), {}));
};

const byggContextFraRequest = (req) => {
  const context = {
    appName: process.env.NAIS_APP_NAME ?? 'yrkesskade-skjema',
    environment: process.env.NODE_ENV,
    userId: req.data?.fnr || '',
    properties: {}
  }

  if (req.data?.fnr) {
    // legg på properties dersom vi har fnr i request
    context.properties = {
      ...context.properties,
      'naeringskoder': req.data.organisasjoner
        .filter((organisasjon: Organisasjon) => !!organisasjon.naeringskode)
        .map((organisasjon: Organisasjon) => organisasjon.naeringskode)
        .join(',')
    }
  }

  return context;
}

export const konfigurerAllFeatureTogglesEndpoint = (app: Express): Express => {
  app.get(`${config.BASE_PATH}/toggles/`, hentBrukerinfo, fetchAllFeatureTogglesHandler);
  return app;
};
