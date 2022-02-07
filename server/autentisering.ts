import axios from 'axios';
import config from './config';

export const redirectTilLogin = async (req, res): Promise<void> => {
  const nodeEnv = process.env.NODE_ENV;
  if (
    nodeEnv === 'local' ||
    nodeEnv === 'development' ||
    nodeEnv === 'labs-gcp'
  ) {
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
  let response = null;

  // dersom vi har satt opp til å bruke token-utils - brukes FAKEDINGS_URL_IDPORTEN
  if (config.IDPORTEN_COOKIE_NAME === 'localhost-idtoken') {
    // fakedings må peke på localhost:[port]/local/jwt som returnerer en token
    response = await axios.get(process.env.FAKEDINGS_URL_IDPORTEN);
  } else {
    // dersom vi bruker fakedings
    response = await axios.post(
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
  }
  const token = await response.data;
  res.cookie(config.IDPORTEN_COOKIE_NAME, token);
  res.redirect(req.query.redirect as string);
};
