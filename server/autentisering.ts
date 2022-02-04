import axios from 'axios';
import config from './config';

export const redirectTilLogin = async (req, res): Promise<void> => {
  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv === 'local' || nodeEnv === 'development' || nodeEnv === 'labs-gcp') {
    await redirectTilMock(req, res);
  } else {
    await redirectTilOauth(req, res);
  }
};

const redirectTilOauth = (req, res): Promise<void> => {
  const referrerUrl = `${process.env.APP_INGRESS}${config.BASE_PATH}/success?redirect=${req.query.redirect}`;
  res.redirect(`/oauth2/login?redirect=${referrerUrl}`);
  return Promise.resolve();
};

const redirectTilMock = async (req, res): Promise<void> => {
  const response = await axios.post(
    'https://fakedings.dev-gcp.nais.io/fake/custom',
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: `sub=00112233445&aud=${encodeURIComponent(
        'bruker-api'
      )}&acr=Level4`,
    }
  );
  const token = await response.data;
  res.cookie('selvbetjening-idtoken', token);
  res.redirect(req.query.redirect as string);
};
