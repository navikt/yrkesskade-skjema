import { logWarn } from "@navikt/yrkesskade-logging";
import { Strategy } from "unleash-client";

export class OrganisasjonsnummerStrategy extends Strategy {
  constructor() {
    super('byOrgnummer');
  }

  isEnabled(parameters, context): boolean {
    if (!parameters.orgnumre) {
      return false;
    }

    const organisasjonsnumre = context.properties.organisasjonsnumre

    if (!organisasjonsnumre || organisasjonsnumre.length === 0) {
      logWarn('Har ingen organisasjoner');
      return false;
    }

    const toggledOrganisasjonsnumre = parameters.orgnumre.split(',');
    const contextOrganisasjonsnumre = organisasjonsnumre.split(',');

    const enabled: boolean = contextOrganisasjonsnumre.some(organisasjonsnummer=> toggledOrganisasjonsnumre.includes(organisasjonsnummer));

    if (!enabled) {
      logWarn(`har ikke nødvendig organisasjonsnumre - har ${organisasjonsnumre}`);
    }

    return enabled;
  }
}
