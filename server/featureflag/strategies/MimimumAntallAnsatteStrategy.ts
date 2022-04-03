import { Strategy } from 'unleash-client';
import { logInfo } from '@navikt/yrkesskade-logging';
export class MinimumAntallAnsatteStrategy extends Strategy {
  constructor() {
    super('byMinimumAntall');
  }

  isEnabled(parameters, context) {
    const minimumAntallAnsatte = parameters.minimumAntallAnsatte

    if (!minimumAntallAnsatte) {
      return true;
    }

    const antallAnsatte = context.properties.antallAnsatte
    const enabled = antallAnsatte >= minimumAntallAnsatte;

    if (!enabled) {
      logInfo(`har ikke nødvendig antall ansatte - har ${antallAnsatte}`);
    }

    return enabled;
  }
}
