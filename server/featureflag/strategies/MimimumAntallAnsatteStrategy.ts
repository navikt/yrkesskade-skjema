import { Strategy } from 'unleash-client';
export class MinimumAntallAnsatteStrategy extends Strategy {
  constructor() {
    super('byMinimumAntall');
  }

  isEnabled(parameters, context) {
    const antallAnsatte = context.properties.antallAnsatte
    const minimumAntallAnsatte = parameters.minimumAntallAnsatte

    const enabled = minimumAntallAnsatte > 0 && antallAnsatte >= minimumAntallAnsatte;

   /* if (!enabled) {
     // console.log(`har ikke nødvendig antall ansatte - har ${antallAnsatte}`);
    }*/

    return enabled;
  }
}
