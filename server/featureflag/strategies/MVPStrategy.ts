import { Strategy } from 'unleash-client';
import { MinimumAntallAnsatteStrategy } from './MimimumAntallAnsatteStrategy';
import { NaeringskodeStrategy } from './NaeringskodeStrategy';
import { OrganisasjonsformStrategy } from './OrganisasjonsformStrategy';

export class MVPStrategy extends Strategy {
  constructor() {
    super('yrkesskadeMVP');
  }

  isEnabled(parameters, context) {
    const strategies = [
      new NaeringskodeStrategy(),
      new MinimumAntallAnsatteStrategy(),
      new OrganisasjonsformStrategy()
    ]


    return strategies.every(strategy => strategy.isEnabled(parameters, context));
  }
}
