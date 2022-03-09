import axios from 'axios';
import { Issuer, TokenSet } from 'openid-client';
import { getMockTokenFromIdPorten, verifiserAccessToken } from './idporten';
import { logInfo, logError } from '@navikt/yrkesskade-logging';

import config from './config'

let tokenXClient;

export const initTokenX = async () => {
  const env = process.env.ENV;
  // tslint:disable-next-line:no-console
  logInfo(`Initializing TokenX:  ${env}`);

  if (env !== 'local') {
    const tokenXIssuer = await Issuer.discover(
      process.env.TOKEN_X_WELL_KNOWN_URL
    );
    tokenXClient = new tokenXIssuer.Client(
      {
        client_id: process.env.TOKEN_X_CLIENT_ID,
        token_endpoint_auth_method: 'private_key_jwt',
      },
      {
        keys: [JSON.parse(process.env.TOKEN_X_PRIVATE_JWK)],
      }
    );
  }
};

const getTokenXToken = async (token: string | Uint8Array, additionalClaims) => {
  let tokenSet;

  try {
    tokenSet = await tokenXClient?.grant(
      {
        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
        client_assertion_type:
          'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
        audience: process.env.TOKENX_AUDIENCE,
        subject_token: token,
      },
      additionalClaims
    );
  } catch (error) {
    // tslint:disable-next-line:no-console
    logError(
      `Noe gitt kalt med token exchange mot TokenX.
    Feilmelding fra openid-client: (${error}).
    HTTP Status fra TokenX: (${error.response.statusCode} ${error.response.statusMessage})
    Body fra TokenX `,
      error
    );
  }

  if (!tokenSet && process.env.ENV === 'local') {
    // Dette skjer kun i lokalt miljø - siden tokenxClient kun blir initialisert i GCP env
    tokenSet = await getMockTokenXToken();
  }

  return tokenSet;
};

const getMockTokenXToken = async () => {
  // ?client_id=someclientid&aud=dev-gcp:targetteam:targetapp&acr=Level4&pid=12345678910
  const tokenXTokenResponse = await (
    await axios.get(
      `${process.env.FAKEDINGS_URL_TOKENX}?aud=${process.env.TOKENX_AUDIENCE}&acr=Level4&pid=12345678910&client_id=yrkesskade-skjema`
    )
  );

  const tokenxToken = tokenXTokenResponse.data;
  return new TokenSet({
    access_token: tokenxToken,
  });
};

export const exchangeToken = async (request) => {
  let token = request.headers?.authorization?.split(' ')[1]; // henter del 2 fra authorization header (Bearer XXXXXXX)

  if (!token) {
    if (process.env.ENV === 'local') {
      token = await getMockTokenFromIdPorten();
    } else {
      // fant ikke token in header - sjekker cookie
      token = request.cookies[config.IDPORTEN_COOKIE_NAME]

      if (!token) {
        // brukeren er ikke autentisert
        return;
      }
    }
  }

  // await verifiserAccessToken(token);
  const additionalClaims = {
    clientAssertionPayload: {
      nbf: Math.floor(Date.now() / 1000),
      aud: [tokenXClient?.issuer.metadata.token_endpoint],
    },
  };

  return await getTokenXToken(token, additionalClaims);
};
