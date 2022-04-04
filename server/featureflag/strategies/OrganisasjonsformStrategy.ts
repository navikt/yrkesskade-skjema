import { Strategy } from "unleash-client";
import { logInfo } from '@navikt/yrkesskade-logging';

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
      return false;
    }

    const contextOrganisasjonsformer = organisasjonsformer;

    const enabled = contextOrganisasjonsformer.find(organisasjonsform => toggledOrganisasjonsformer.includes(organisasjonsform));

    if (!enabled) {
      logInfo(`har ikke nødvendig organisasjonsformer - har ${organisasjonsformer}`);
    }

    return enabled;
  }
}
