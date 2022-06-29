import { Client, ClientMetadata } from 'openid-client';
import { initKlient } from './klient';
import fs from 'fs';
import { opprettClient } from '@navikt/yrkesskade-backend/dist/auth/tokenUtils';

const opprettTokenxClient = async (key: string): Promise<Client> => {
  const metadata: ClientMetadata = {
    client_id: process.env.TOKEN_X_CLIENT_ID,
    token_endpoint_auth_method: 'private_key_jwt',
  };
  const jwks = {
    keys: [JSON.parse(process.env.TOKEN_X_PRIVATE_JWK)],
  };

  return await opprettClient(
    key,
    process.env.TOKEN_X_WELL_KNOWN_URL,
    metadata,
    jwks
  );
};

const opprettFakedingsTokenXClient = async (key: string) => {
  const metadata: ClientMetadata = {
    client_id: 'local',
    token_endpoint_auth_method: 'private_key_jwt',
    token_endpoint_auth_signing_alg: 'RS256',
  };
  const jwks = {
    keys:
      process.env.ENV === 'local'
        ? [localJWK()]
        : [JSON.parse(process.env.TOKEN_X_PRIVATE_JWK)],
  };

  return await opprettClient(
    key,
    process.env.TOKEN_X_WELL_KNOWN_URL,
    metadata,
    jwks
  );
};

export const initTokenX = async () => {
  return initKlient(
    'tokenX',
    process.env.ENV === 'local'
      ? opprettFakedingsTokenXClient
      : opprettTokenxClient
  );
};

const localJWK = () => {
  const data = fs.readFileSync('local-jwk.json');
  return JSON.parse(data.toString());
};
