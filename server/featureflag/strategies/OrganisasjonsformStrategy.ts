import { Strategy } from "unleash-client";
import { logWarn } from '@navikt/yrkesskade-logging';

export class OrganisasjonsformStrategy extends Strategy {
  constructor() {
    super('byOrganisasjonsformer');
  }

  isEnabled(parameters, context) {
    const toggledOrganisasjonsformer = parameters.organisasjonsformer;
    if (!toggledOrganisasjonsformer) {
      return true;
    }

    const organisasjonsformer = context.properties.organisasjonsformer

    if (!organisasjonsformer) {
      logWarn('Har ingen organisasjonsformer');
      return false;
    }

    const contextOrganisasjonsformer = organisasjonsformer.split(',');

    const enabled = contextOrganisasjonsformer.some(organisasjonsform => toggledOrganisasjonsformer.includes(organisasjonsform));

    if (!enabled) {
      logWarn(`har ikke nødvendig organisasjonsformer - har ${organisasjonsformer}`);
    }

    return enabled;
  }
}
