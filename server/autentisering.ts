import axios from 'axios';
import config from './config';

export const redirectTilLogin = async (req, res): Promise<void> => {
  const nodeEnv = process.env.NODE_ENV;
  const env = process.env.ENV;
  if (
    nodeEnv === 'local' ||
    nodeEnv === 'development' && env === 'local' ||
    nodeEnv === 'labs-gcp'
  ) {
    await redirectTilMock(req, res);
  } else {
    await redirectTilOauth(req, res);
  }
};

const redirectTilOauth = (req, res): Promise<void> => {
  res.redirect(`/oauth2/login?redirect=${req.query.redirect}`);
  return Promise.resolve();
};

const redirectTilMock = async (req, res): Promise<void> => {
  const response = await axios.get(`${process.env.FAKEDINGS_URL_IDPORTEN}?pid=12345678910&acr=Level4`);
  const token = await response.data;
  res.cookie(config.IDPORTEN_COOKIE_NAME, token);
  res.redirect(req.query.redirect as string);
};
