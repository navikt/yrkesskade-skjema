import { BaseClient, Issuer } from 'openid-client';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import axios from 'axios';
import { logInfo } from '@navikt/yrkesskade-logging';

const acceptedAcrLevel = 'Level4'; // definert i nais.yaml idporten.sidecar.level attributen
const acceptedSigningAlgorithm = 'RS256';

let idPortenIssuer: Issuer<BaseClient>;
let _remoteJWKSet;

export const initIdPorten = async () => {
  const nodeEnv = process.env.NODE_ENV
  // tslint:disable-next-line:no-console
  logInfo(`Initializing IDPorten: ${nodeEnv}`);
    if (nodeEnv === 'labs-gcp' || nodeEnv === 'local') {
        // returner MOCK for labs
        return;
    }

    idPortenIssuer = await Issuer.discover(process.env.IDPORTEN_WELL_KNOWN_URL);
    _remoteJWKSet = createRemoteJWKSet(new URL(idPortenIssuer.metadata.jwks_uri));
}

export const verifiserAccessToken = async (token: string | Uint8Array) => {
    const { payload } = await jwtVerify(token, _remoteJWKSet, {
        algorithms: [acceptedSigningAlgorithm],
        issuer: idPortenIssuer.metadata.issuer
    });

    if (payload.acr !== acceptedAcrLevel) {
        throw new Error('Invalid ACR-level');
    }

    if (payload.client_id !== process.env.IDPORTEN_CLIENT_ID && process.env.NODE_ENV === 'node-local') {
        throw new Error('Invalid client id');
    }
}

// Mock IDPorten
export const getMockTokenFromIdPorten = async () => {
    return await (await axios.get(`${process.env.FAKEDINGS_URL_IDPORTEN}?acr=Level=4`)).data;
}
