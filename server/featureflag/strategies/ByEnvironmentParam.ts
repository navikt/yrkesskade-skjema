import { logWarn } from "@navikt/yrkesskade-logging";
import { Strategy } from "unleash-client";

export class ByEnvironmentParam extends Strategy {
  constructor() {
    super('byEnvironmentParam');
  }

  isEnabled(parameters, context) {
    const environments = parameters.environment ? parameters.environment.split(",") : [];
    if (environments && environments.length === 0) {
      return true;
    }

    const enabled = environments.some(environment => environment === process.env.ENV);

    if (!enabled) {
      logWarn(`${process.env.ENV} er utilgjengelig. Verdier: ${environments}`);
    }

    return enabled;
  }
}
