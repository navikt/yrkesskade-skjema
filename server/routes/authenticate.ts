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
    let token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
      token = req.cookies[config.IDPORTEN_COOKIE_NAME];
    }
    if (token) {
      logInfo(
        `innlogget? ja (token eksisterer)`
      );
      res.status(200).send();
    } else {
      logInfo(
        `innlogget? nei (authorization header eller token mangler)`
      );
      res.status(401).send();
    }
  });

};
