import { logInfo } from '@navikt/yrkesskade-logging';
import { Client } from 'openid-client';

export const initKlient = async (
  navn: string,
  clientFn: (navn: string) => Promise<Client>
) => {
  logInfo(`Init ${navn} OpenID klient for ${process.env.ENV}`);
  const klient = await clientFn(navn);
  return klient;
};
