import { Strategy } from 'unleash-client';
import { logWarn } from '@navikt/yrkesskade-logging';

export class NaeringskodeStrategy extends Strategy {
  constructor() {
    super('byNaeringskoder');
  }

  isEnabled(parameters, context) {
    if (!parameters.naeringskoder) {
      return true;
    }

    const toggledNaeringskoder = parameters.naeringskoder.split(',');

    const naeringskoderProperty = context.properties.naeringskoder
    if (!naeringskoderProperty) {
      logWarn('Har ingen næringskoder')
      return false;
    }

    const contextNaeringskoder = naeringskoderProperty.split(',');

    const enabled = contextNaeringskoder.some(naeringskode => toggledNaeringskoder.includes(naeringskode));

    if (!enabled) {
      logWarn(`har ikke nødvendig næringskode - har ${naeringskoderProperty}`);
    }

    return enabled;
  }
}
