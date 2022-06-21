import { IService } from '@navikt/yrkesskade-backend/dist/typer';

let proxyUrls: { [key: string]: string } = {};
if (process.env.ENV === 'local') {
  proxyUrls = {
    yrkesskade_kodeverk: 'https://yrkesskade-kodeverk.dev.intern.nav.no',
    yrkesskade_melding_api: 'http://yrkesskade-melding-api:8080',
  };
} else {
  const env = process.env.ENV === 'prod' ? '' : `.${process.env.ENV}`;
  proxyUrls = {
    yrkesskade_kodeverk: `https://yrkesskade-kodeverk${env}.intern.nav.no`,
    yrkesskade_melding_api: `https://yrkesskade-melding-api${env}.intern.nav.no`,
  };
}

export const serviceConfig: IService[] = [
  {
    cluster: 'gcp',
    displayName: 'Yrkesskade Kodeverk',
    id: 'yrkesskade-kodeverk',
    proxyPath: '/kodeverk',
    proxyUrl: proxyUrls.yrkesskade_kodeverk,
  },
  {
    cluster: 'gcp',
    displayName: 'Yrkesskade Melding API',
    id: 'yrkesskade-melding-api',
    proxyPath: '/backend',
    proxyUrl: proxyUrls.yrkesskade_melding_api,
  },
];
