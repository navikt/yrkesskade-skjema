/**
 * @jest-environment node
 */

import { Organisasjon } from "../../client/src/types/brukerinfo";
import { Context, initialize, startUnleash } from "unleash-client";
import { IsNotProdStrategy } from "./strategies/IsNotProdStrategy";
import { MVPStrategy } from "./strategies/MVPStrategy";
import { OrganisasjonsnummerStrategy } from "./strategies/OrganisasjonsNummerStrategy";

test('test unleash', async () => {

  const unleash = await startUnleash({
    url: 'https://unleash.nais.io/api/',
    appName: 'yrkesskade-skjema-test',
    strategies: [
      new IsNotProdStrategy(),
      new OrganisasjonsnummerStrategy(),
      new MVPStrategy(),
    ],
  });

  const context: Context = {
    appName: process.env.NAIS_APP_NAME ?? 'yrkesskade-skjema-test',
    environment: 'prod',
    userId: '12345678910',
    properties: {}
  }

  const organisasjoner: Organisasjon[] = [{navn: 'Test', status: 'aktiv', type: 'test', organisasjonsnummer: '973900722', naeringskode: '88.911', organisasjonsform: 'AS', antallAnsatte: 10},
  {navn: 'Test 2', status: 'aktiv', type: 'test', organisasjonsnummer: '973900721', naeringskode: '48.911', organisasjonsform: 'AS', antallAnsatte: 10}]


    // legg på properties dersom vi har fnr i request
    context.properties = {
      ...context.properties,
      'organisasjonsnumre': organisasjoner.map(organisasjon => organisasjon.organisasjonsnummer).join(','),
      'naeringskoder': organisasjoner
        .filter((organisasjon: Organisasjon) => !!organisasjon.naeringskode)
        .map((organisasjon: Organisasjon) => organisasjon.naeringskode)
        .join(','),
      'antallAnsatte': Math.max.apply(Math, organisasjoner.map((organisasjon: Organisasjon) =>  organisasjon.antallAnsatte )),
      'organisasjonsformer': organisasjoner
        .filter((organisasjon: Organisasjon) => !!organisasjon.organisasjonsform)
        .map((organisasjon: Organisasjon) => organisasjon.organisasjonsform)
        .join(','),
    }



  const enabled = unleash.isEnabled('yrkesskade.digital-skjema-innsending', context);
  expect(enabled).toBe(true);
})
