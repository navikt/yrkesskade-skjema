import { Context, initialize } from "unleash-client";
import { IsNotProdStrategy } from "./strategies/IsNotProdStrategy";
import { NaeringskodeStrategy } from "./strategies/NaeringskodeStrategy";

const unleash = initialize({
  url: 'https://unleash.nais.io/api/',
  appName: process.env.NAIS_APP_NAME ?? 'yrkesskade-skjema',
  strategies: [new NaeringskodeStrategy(), new IsNotProdStrategy()]
});

export const isEnabled = (feature: string, context?: Context): boolean => {
  return unleash.isEnabled(feature, context);
};
