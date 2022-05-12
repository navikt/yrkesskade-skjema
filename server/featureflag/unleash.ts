import { Context, initialize } from 'unleash-client';
import { ByEnvironmentParam } from './strategies/ByEnvironmentParam';
import { IsNotProdStrategy } from './strategies/IsNotProdStrategy';
import { MVPStrategy } from './strategies/MVPStrategy';
import { OrganisasjonsnummerStrategy } from './strategies/OrganisasjonsNummerStrategy';

const unleash = initialize({
  url: 'https://unleash.nais.io/api/',
  appName: process.env.NAIS_APP_NAME ?? 'yrkesskade-skjema',
  strategies: [
    new IsNotProdStrategy(),
    new OrganisasjonsnummerStrategy(),
    new MVPStrategy(),
    new ByEnvironmentParam(),
  ],
});

export const isEnabled = (feature: string, context?: Context): boolean => {
  return unleash.isEnabled(feature, context);
};
