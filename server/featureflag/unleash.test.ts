/**
 * @jest-environment node
 */

import { Context, initialize, startUnleash } from "unleash-client";
import { IsNotProdStrategy } from "./strategies/IsNotProdStrategy";
import { MVPStrategy } from "./strategies/MVPStrategy";
import { OrganisasjonsnummerStrategy } from "./strategies/OrganisasjonsNummerStrategy";

test.skip('test unleash', async () => {

  const unleash = await startUnleash({
    url: 'https://unleash.nais.io/api/',
    appName: 'yrkesskade-skjema-test',
    strategies: [
    //  new IsNotProdStrategy(),
    //  new OrganisasjonsnummerStrategy(),
      new MVPStrategy(),
    ],
  });

  const context: Context = {
    appName: 'yrkesskade-skjema-test',
    properties: { antallAnsatte: 10, naeringskoder: '64.1', organisasjonsformer: 'AS'}
  }

  const enabled = unleash.isEnabled('yrkesskade.digital-skjema-innsending', context);
  expect(enabled).toBe(true);
})
