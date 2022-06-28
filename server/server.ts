import express from 'express';
import path from 'path';
import { getHtmlWithDecorator } from './dekorator';
import { initIdPorten } from './auth/idporten';
import config from './config';
import dotenv from 'dotenv';
import { initTokenX } from './auth/tokenx';
import {
  konfigurerAllFeatureTogglesEndpoint as configureAllFeatureTogglesEndpoint,
  configureFeatureTogglesEndpoint,
} from './routes/feature-toggles';
import { configureAuthenticationAndVerification } from './routes/authenticate';
import { configureLoggingEndpoint } from './routes/logging';
import bodyParser from 'body-parser';
import { logInfo } from '@navikt/yrkesskade-logging';
import { configurePrintEndpoint } from './routes/print';
import {
  default as backend,
  IApp,
  IAppOptions,
} from '@navikt/yrkesskade-backend';
import { IService } from '@navikt/yrkesskade-backend/dist/typer';
import { ensureAuthenticated } from '@navikt/yrkesskade-backend/dist/auth/tokenUtils';
import { attachToken, doProxy } from './middleware/proxy';
import { serviceConfig } from './serviceConfig';
import { configureUserInfo } from './routes/bruker';

const BUILD_PATH = path.join(__dirname, '../build');
const PORT = process.env.PORT || 3000;

dotenv.config();

const options: IAppOptions = {
  kreverAutentisering: true,
};

backend(options).then((iApp: IApp) => {
  const { app } = iApp;

  app.use(express.static('./build'));

  // configure the app to use bodyParser()
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());

  // autentisering og verifikasjon
  configureAuthenticationAndVerification(app);
  configureUserInfo(app);

  serviceConfig.map((service: IService) => {
    app.use(
      service.proxyPath,
      ensureAuthenticated,
      attachToken(service),
      doProxy(service)
    );
  });

  // feature toggle endpoints
  configureFeatureTogglesEndpoint(app);
  configureAllFeatureTogglesEndpoint(app);

  // enpoint to send frontend logs to remote logging services
  configureLoggingEndpoint(app);

  // print endpoint
  configurePrintEndpoint(app);

  app.get(`${config.BASE_PATH}/*`, (req: any, res: any) =>
    getHtmlWithDecorator(`${BUILD_PATH}/index.html`)
      .then((html) => {
        res.send(html);
      })
      .catch((e) => {
        logInfo('Dekoratøren error', e);
        res.status(500).send(e);
      })
  );

  app.listen(PORT, async () => {
    await Promise.all([initIdPorten(), initTokenX()]);
    logInfo(`Server listening on ${PORT}`);
  });
});
