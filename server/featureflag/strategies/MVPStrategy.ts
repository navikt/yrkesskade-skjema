import { Strategy } from 'unleash-client';
import { MinimumAntallAnsatteStrategy } from './MimimumAntallAnsatteStrategy';
import { NaeringskodeStrategy } from './NaeringskodeStrategy';

export class MVPStrategy extends Strategy {
  constructor() {
    super('yrkesskadeMVP');
  }

  isEnabled(parameters, context) {
    const strategies = [
      new NaeringskodeStrategy(),
      new MinimumAntallAnsatteStrategy()
    ]

    return strategies.every(strategy => strategy.isEnabled(parameters, context));
  }
}
