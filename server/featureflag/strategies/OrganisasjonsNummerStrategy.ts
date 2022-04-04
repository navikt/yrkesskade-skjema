import { logInfo } from "@navikt/yrkesskade-logging";
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

    if (!organisasjonsnumre) {
      return false;
    }

    const toggledOrganisasjonsnumre = parameters.orgnumre.split(',');
    const contextOrganisasjonsnumre = organisasjonsnumre.split(',');

    const enabled: boolean = contextOrganisasjonsnumre.some(organisasjonsnummer=> toggledOrganisasjonsnumre.includes(organisasjonsnummer));

    if (!enabled) {
      logInfo(`har ikke nødvendig organisasjonsnumre - har ${organisasjonsnumre}`);
    }

    return enabled;
  }
}
