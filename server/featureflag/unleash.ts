import { Context, initialize } from "unleash-client";
import { NaeringskodeStrategy } from "./strategy";

const unleash = initialize({
  url: 'https://unleash.nais.io/api/',
  appName: process.env.NAIS_APP_NAME ?? 'yrkesskade-skjema',
  strategies: [new NaeringskodeStrategy()]
});

export const isEnabled = (feature: string, context?: Context): boolean => {
  return unleash.isEnabled(feature, context);
};
