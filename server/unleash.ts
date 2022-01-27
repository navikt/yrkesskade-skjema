import { initialize } from "unleash-client";

const unleash = initialize({
  url: 'https://unleash.nais.io/api/',
  appName: process.env.NAIS_APP_NAME ?? 'yrkesskade-skjema'
});

export const isEnabled = (feature: string): boolean => {
  return unleash.isEnabled(feature);
};
