import { Strategy } from "unleash-client";

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

    return contextNaeringskoder.find(naeringskode => toggledNaeringskoder.includes(naeringskode));
  }
}
