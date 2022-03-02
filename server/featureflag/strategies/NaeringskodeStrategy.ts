import { Strategy } from 'unleash-client';
import { logInfo } from '@navikt/yrkesskade-logging';

export class NaeringskodeStrategy extends Strategy {
  constructor() {
    super('byNaeringskoder');
  }

  isEnabled(parameters, context) {
    const naeringskoderProperty = context.properties.naeringskoder

    if (!naeringskoderProperty) {
      return false;
    }

    const toggledNaeringskoder = parameters.naeringskoder?.split(',');
    const contextNaeringskoder = naeringskoderProperty.split(',');

    const enabled = contextNaeringskoder.find(naeringskode => toggledNaeringskoder.includes(naeringskode));

    if (!enabled) {
      logInfo(`har ikke nødvendig næringskode - har ${naeringskoderProperty}`);
    }

    return enabled;
  }
}
