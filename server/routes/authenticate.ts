import { Express } from 'express';
import { redirectTilLogin } from '../autentisering';
import config from '../config';
import { konfigurerAllFeatureTogglesEndpoint } from './feature-toggles';

export const configureAuthenticationAndVerification = (app: Express) => {

  app.get(`${config.BASE_PATH}/success`, (req, res) => {
    const loginserviceToken = req.cookies[config.IDPORTEN_COOKIE_NAME];
    const redirectUrl = req.query.redirect as string;
    if (loginserviceToken && redirectUrl?.startsWith(process.env.APP_INGRESS)) {
      res.redirect(redirectUrl);
    } else if (redirectUrl?.startsWith(process.env.APP_INGRESS)) {
      res.redirect(`${process.env.LOGIN_URL}${redirectUrl}`);
    } else {
      res.redirect(`${process.env.LOGIN_URL}${process.env.APP_INGRESS}`);
    }
  });

  app.get(
    `${config.BASE_PATH}/redirect-til-login`,
    (request: any, response: any) => {
      redirectTilLogin(request, response);
    }
  );

  app.get(`${config.BASE_PATH}/innlogget`, (req, res) => {
    const loginserviceToken = req.cookies[config.IDPORTEN_COOKIE_NAME];
    if (loginserviceToken) {
      // tslint:disable-next-line:no-console
      console.log(
        `innlogget? ja (cookie ${config.IDPORTEN_COOKIE_NAME} eksisterer)`
      );
      res.status(200).send();
    } else {
      // tslint:disable-next-line:no-console
      console.log(
        `innlogget? nei (cookie ${config.IDPORTEN_COOKIE_NAME} mangler)`
      );
      res.status(401).send();
    }
  });

};
