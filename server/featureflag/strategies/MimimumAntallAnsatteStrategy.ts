import { Strategy } from 'unleash-client';
import { logInfo } from '@navikt/yrkesskade-logging';
export class MinimumAntallAnsatteStrategy extends Strategy {
  constructor() {
    super('byMinimumAntall');
  }

  isEnabled(parameters, context) {
    const antallAnsatte = context.properties.antallAnsatte
    const minimumAntallAnsatte = parameters.minimumAntallAnsatte

    const enabled = minimumAntallAnsatte > 0 && antallAnsatte >= minimumAntallAnsatte;

    if (!enabled) {
      logInfo(`har ikke nødvendig antall ansatte - har ${antallAnsatte}`);
    }

    return enabled;
  }
}
