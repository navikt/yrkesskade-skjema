import { logWarn } from '@navikt/yrkesskade-logging';
import { Strategy } from 'unleash-client';
import { MinimumAntallAnsatteStrategy } from './MimimumAntallAnsatteStrategy';
import { NaeringskodeStrategy } from './NaeringskodeStrategy';
import { OrganisasjonsformStrategy } from './OrganisasjonsformStrategy';

export class MVPStrategy extends Strategy {
  private strategies = [
    new NaeringskodeStrategy(),
    new MinimumAntallAnsatteStrategy(),
    new OrganisasjonsformStrategy()
  ]

  constructor() {
    super('yrkesskadeMVP');
  }

  isEnabled(parameters, context) {
    const allEnabled = this.strategies.every(strategy => {
      const enabled = strategy.isEnabled(parameters, context)
      if (!enabled) {
        logWarn(`${strategy.name} is not enabled, parameters: ${JSON.stringify(parameters)}, context: ${JSON.stringify(context)}`)
      }
      return enabled;
    });

    return allEnabled;
  }
}
