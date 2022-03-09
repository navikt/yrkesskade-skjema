import { Express } from 'express';
import { redirectTilLogin } from '../autentisering';
import config from '../config';
import { logInfo } from '@navikt/yrkesskade-logging';

export const configureAuthenticationAndVerification = (app: Express) => {

  app.get(
    `${config.BASE_PATH}/redirect-til-login`,
    (request: any, response: any) => {
      redirectTilLogin(request, response);
    }
  );

  app.get(`${config.BASE_PATH}/innlogget`, (req, res) => {
    logInfo('Headers: ' + JSON.stringify(req.headers));
    const loginserviceToken = req.cookies[config.IDPORTEN_COOKIE_NAME];
    if (loginserviceToken) {
      logInfo(
        `innlogget? ja (cookie ${config.IDPORTEN_COOKIE_NAME} eksisterer)`
      );
      res.status(200).send();
    } else {
      logInfo(
        `innlogget? nei (cookie ${config.IDPORTEN_COOKIE_NAME} mangler)`
      );
      res.status(401).send();
    }
  });

};
