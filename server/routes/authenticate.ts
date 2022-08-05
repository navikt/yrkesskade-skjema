import { Express } from 'express';
import { redirectTilLogin } from '../autentisering';
import config from '../config';

export const configureAuthenticationAndVerification = (app: Express) => {

  app.get(
    `${config.BASE_PATH}/redirect-til-login`,
    (request: any, response: any) => {
      redirectTilLogin(request, response);
    }
  );
};
