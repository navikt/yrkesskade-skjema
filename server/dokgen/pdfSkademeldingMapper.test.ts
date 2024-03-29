import { Skademelding, SkadetDel, Tid } from '../../client/src/api/yrkesskade';
import { pdfSkademeldingMapper } from './pdfSkademeldingMapper';
import { fixtures } from '../../fixtures/skademelding'
import { KodeverkLoader } from '../kodeverk/kodeverk';
import { PdfAdresse, PdfRolletype, PdfSkadetDel, PdfTid, PdfTidspunkt, Soknadsfelt } from './models';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';


jest.mock('../kodeverk/kodeverk', () => {
  return {
    KodeverkLoader: jest.fn().mockImplementation(() => {
      return {
        init: (rolletype) => (Promise.resolve()),
        mapKodeTilVerdi: (kode: string, kodelistenavn: string): string => kode,
        mapKoderTilVerdier: (koder: string[], kodelistenavn: string): string[] => koder,
      };
    })
  };
});

const DATO_FORMAT = 'dd.MM.yyyy';
const KLOKKESLETT_FORMAT = 'HH:mm';

describe('PdfSkademeldingMapper', () => {

  test('fullstending skademelding arbeidstaker - ingen avvik', async () => {
    const tidspunkt = new Date();
    const skademelding = fixtures.full(tidspunkt);

    const pdfSkademelding = await pdfSkademeldingMapper(skademelding)

    const pdfSkadelidt = pdfSkademelding.skadelidt;
    const pdfInnmelder = pdfSkademelding.innmelder;
    const pdfTid= pdfSkademelding.hendelsesfakta.tid;
    const pdfHendelsesfakta = pdfSkademelding.hendelsesfakta;
    const pdfUlykkested = pdfHendelsesfakta.ulykkessted;
    const pdfSkade = pdfSkademelding.skade;

    // innmelder
    expect(pdfSkademelding.dokumentInfo.tekster.innmelderSeksjonstittel).toEqual('Om innmelder');
    expectSoknadsfelt(pdfInnmelder.norskIdentitetsnummer, 'Fødselsnummer', '12345678910');
    expectSoknadsfelt(pdfInnmelder.altinnrolleIDer, 'Roller hentet fra Altinn', ['1','2']);
    expectSoknadsfelt(pdfInnmelder.paaVegneAv, 'Org.nr', '123456789');
    expectSoknadsfelt(pdfSkadelidt.dekningsforhold.navnPaaVirksomheten, 'Bedrift', 'Ork og Lidelse AS');
    expectSoknadsfeltAdresse(pdfSkadelidt.dekningsforhold.virksomhetensAdresse, 'Virksomhetens adresse', { adresselinje1: 'Testveien 1', adresselinje2: '1111', adresselinje3: 'TEST', land: 'NO'});

    // tid og sted
    expect(pdfSkademelding.dokumentInfo.tekster.tidOgStedSeksjonstittel).toEqual('Tid og sted');
    expectSoknadsfeltTid(pdfTid, 'Når skjedde ulykken som skal meldes?', {verdi1: format(tidspunkt, DATO_FORMAT), verdi2: format(tidspunkt, KLOKKESLETT_FORMAT)}, 0, skademelding.hendelsesfakta.tid.tidstype);
    expectSoknadsfelt(pdfSkademelding.hendelsesfakta.naarSkjeddeUlykken, 'Innenfor hvilket tidsrom inntraff ulykken', 'iAvtaltArbeidstid');

    // skadelidt
    expect(pdfSkadelidt.norskIdentitetsnummer.label).toEqual('Fødselsnummer');
    expectSoknadsfelt(pdfSkadelidt.norskIdentitetsnummer, 'Fødselsnummer', '2345678901');
    expectSoknadsfeltRolletype(pdfSkadelidt.dekningsforhold.rolletype, 'Rolle', { kode: 'arbeidstaker', navn: 'Arbeidstaker' });

    // ulykken
    expect(pdfSkademelding.dokumentInfo.tekster.omUlykkenSeksjonstittel).toEqual('Ulykkessted og om ulykken');
    expectSoknadsfeltAdresse(pdfUlykkested.adresse, 'Adresse for ulykken', { adresselinje1: 'Testveien 2', adresselinje2: '1112', adresselinje3: 'TOAST', land: 'NO'});
    expectSoknadsfelt(pdfHendelsesfakta.paavirkningsform, 'Hvilken skadelig påvirkning har personen vært utsatt for', undefined);
    expectSoknadsfelt(pdfSkade.alvorlighetsgrad, 'Hvor alvorlig var hendelsen', 'antattOppsoektLege');
    expectSoknadsfelt(pdfHendelsesfakta.hvorSkjeddeUlykken, 'Hvor skjedde ulykken', 'arbeidsstedInne');
    expectSoknadsfelt(pdfHendelsesfakta.stedsbeskrivelse, 'Hvilken type arbeidsplass er det', 'anleggsomraadeEllerByggeplassEllerStenbruddEllerGruve');
    expectSoknadsfelt(pdfHendelsesfakta.aarsakUlykke, 'Hva var årsaken til hendelsen og bakgrunn for årsaken', ['stukketEllerKuttet', 'stoetEllerTreffAvGjenstand']);
    expectSoknadsfelt(pdfHendelsesfakta.bakgrunnsaarsak, 'Hva var bakgrunnen til hendelsen', ['manglendeMerkingEllerVarsling', 'verneutstyrUtAvFunksjon']);

    // skaden
    pdfSkade.skadedeDeler.forEach((skadetDel, index) => {
      expectSoknadsfelt(skadetDel.kroppsdel, 'Hvor på kroppen er skaden', skademelding.skade.skadedeDeler[index].kroppsdel);
      expectSoknadsfelt(skadetDel.skadeart, 'Hva slags skade eller sykdom er det', skademelding.skade.skadedeDeler[index].skadeart);
    });
    expectSoknadsfelt(pdfSkade.antattSykefravaer, 'Har den skadelidte hatt fravær', 'treDagerEllerMindre');
    expectSoknadsfelt(pdfHendelsesfakta.utfyllendeBeskrivelse, 'Utfyllende beskrivelse', 'Dette er en utfyllende beskrivelse');

    // er skade
    expect(pdfSkademelding.dokumentInfo.annet.erSykdom).toBe(false);

  });

  test('test yrkessykdom arbeidstaker', async () => {
    const tidspunkt = new Date();
    const skademelding = fixtures.sykdom(tidspunkt);

    const pdfSkademelding = await pdfSkademeldingMapper(skademelding)

    const pdfSkadelidt = pdfSkademelding.skadelidt;
    const pdfInnmelder = pdfSkademelding.innmelder;
    const pdfTid= pdfSkademelding.hendelsesfakta.tid;
    const pdfHendelsesfakta = pdfSkademelding.hendelsesfakta;
    const pdfUlykkested = pdfHendelsesfakta.ulykkessted;
    const pdfSkade = pdfSkademelding.skade;

    // innmelder
    expect(pdfSkademelding.dokumentInfo.tekster.innmelderSeksjonstittel).toEqual('Om innmelder');
    expectSoknadsfelt(pdfInnmelder.norskIdentitetsnummer, 'Fødselsnummer', '12345678910');
    expectSoknadsfelt(pdfInnmelder.altinnrolleIDer, 'Roller hentet fra Altinn', ['1','2']);
    expectSoknadsfelt(pdfInnmelder.paaVegneAv, 'Org.nr', '123456789');
    expectSoknadsfelt(pdfSkadelidt.dekningsforhold.navnPaaVirksomheten, 'Bedrift', 'Ork og Lidelse AS');
    expectSoknadsfeltAdresse(pdfSkadelidt.dekningsforhold.virksomhetensAdresse, 'Virksomhetens adresse', { adresselinje1: 'Testveien 1', adresselinje2: '1111', adresselinje3: 'TEST', land: 'NO'});

    // tid og sted
    expect(pdfSkademelding.dokumentInfo.tekster.tidOgStedSeksjonstittel).toEqual('Tid og sted');
    expectSoknadsfeltTid(pdfTid, 'Når skjedde ulykken som skal meldes?', {verdi1: format(tidspunkt, DATO_FORMAT), verdi2: format(tidspunkt, KLOKKESLETT_FORMAT)}, 2, skademelding.hendelsesfakta.tid.tidstype);
    expectSoknadsfelt(pdfTid.sykdomPaavist, 'Når ble sykdommen påvist?', format(new Date(2022, 1, 15), DATO_FORMAT))
    expectSoknadsfelt(pdfSkademelding.hendelsesfakta.naarSkjeddeUlykken, 'Innenfor hvilket tidsrom inntraff ulykken', 'iAvtaltArbeidstid');

    // skadelidt
    expect(pdfSkadelidt.norskIdentitetsnummer.label).toEqual('Fødselsnummer');
    expectSoknadsfelt(pdfSkadelidt.norskIdentitetsnummer, 'Fødselsnummer', '2345678901');
    expectSoknadsfeltRolletype(pdfSkadelidt.dekningsforhold.rolletype, 'Rolle', { kode: 'arbeidstaker', navn: 'Arbeidstaker' });

    // ulykken
    expect(pdfSkademelding.dokumentInfo.tekster.omUlykkenSeksjonstittel).toEqual('Om den skadelige påvirkningen');
    expectSoknadsfeltAdresse(pdfUlykkested.adresse, 'Adresse hvor den skadelige påvirkningen har skjedd', { adresselinje1: 'Testveien 2', adresselinje2: '1112', adresselinje3: 'TOAST', land: 'NO'});
    expectSoknadsfelt(pdfHendelsesfakta.paavirkningsform, 'Hvilken skadelig påvirkning har personen vært utsatt for', ['stoevpaavirkning', 'kjemikalierEllerLoesemidler']);
    expectSoknadsfelt(pdfSkade.alvorlighetsgrad, 'Hvor alvorlig var hendelsen', 'antattOppsoektLege');
    expectSoknadsfelt(pdfHendelsesfakta.hvorSkjeddeUlykken, 'Hvor skjedde hendelsen', 'arbeidsstedInne');
    expectSoknadsfelt(pdfHendelsesfakta.stedsbeskrivelse, 'Hvilken type arbeidsplass er det', 'anleggsomraadeEllerByggeplassEllerStenbruddEllerGruve');
    expectSoknadsfelt(pdfHendelsesfakta.aarsakUlykke, 'Hva var årsaken til hendelsen og bakgrunn for årsaken', ['stukketEllerKuttet', 'stoetEllerTreffAvGjenstand']);
    expectSoknadsfelt(pdfHendelsesfakta.bakgrunnsaarsak, 'Hva var bakgrunnen til hendelsen', ['manglendeMerkingEllerVarsling', 'verneutstyrUtAvFunksjon']);

    // skaden
    pdfSkade.skadedeDeler.forEach((skadetDel, index) => {
      expectSoknadsfelt(skadetDel.kroppsdel, 'Hvor på kroppen er skaden', skademelding.skade.skadedeDeler[index].kroppsdel);
      expectSoknadsfelt(skadetDel.skadeart, 'Hva slags skade eller sykdom er det', skademelding.skade.skadedeDeler[index].skadeart);
    });
    expectSoknadsfelt(pdfSkade.antattSykefravaer, 'Har den skadelidte hatt fravær', 'treDagerEllerMindre');
    expectSoknadsfelt(pdfHendelsesfakta.utfyllendeBeskrivelse, 'Utfyllende beskrivelse', 'Dette er en utfyllende beskrivelse');

    // er sykdom
    expect(pdfSkademelding.dokumentInfo.annet.erSykdom).toBe(true);

  });
})

const expectSoknadsfelt = <T>(soknadsfelt: Soknadsfelt<T>, expectedLabel, expectedVerdi) => {
  expect(soknadsfelt).toBeDefined();
  expect(soknadsfelt.label).toEqual(expectedLabel);
  expect(soknadsfelt.verdi).toEqual(expectedVerdi);
}

const expectSoknadsfeltRolletype = (soknadsfelt: Soknadsfelt<PdfRolletype>, expectedLabel, expectedRolletype: ExpectedRolletype) => {
  expect(soknadsfelt).toBeDefined();
  expect(soknadsfelt.label).toEqual(expectedLabel);
  expect(soknadsfelt.verdi.kode).toEqual(expectedRolletype.kode);
  // expect(soknadsfelt.verdi.navn).toEqual(expectedRolletype.navn);
}

const expectSoknadsfeltAdresse = (soknadsfelt: Soknadsfelt<PdfAdresse>, expectedLabel, expectedAdresse: ExpectedAdresse) => {
  expect(soknadsfelt).toBeDefined();
  expect(soknadsfelt.label).toEqual(expectedLabel);
  expect(soknadsfelt.verdi.adresselinje1).toEqual(expectedAdresse.adresselinje1);
  expect(soknadsfelt.verdi.adresselinje2).toEqual(expectedAdresse.adresselinje2);
  expect(soknadsfelt.verdi.adresselinje3).toEqual(expectedAdresse.adresselinje3);
  expect(soknadsfelt.verdi.land).toEqual(expectedAdresse.land);
}

const expectSoknadsfeltTid = (pdfTid: PdfTid, expectedLabel, expectedTid: ExpectedTid, expectedAntallPerioder: number, tidstype: Tid.tidstype) => {
  expect(pdfTid).toBeDefined()
  if (tidstype === Tid.tidstype.TIDSPUNKT) {
    expect(pdfTid.tidspunkt.label).toEqual(expectedLabel);
    expect(pdfTid.tidspunkt.verdi.dato).toEqual(expectedTid.verdi1);
    expect(pdfTid.tidspunkt.verdi.klokkeslett).toEqual(expectedTid.verdi2);
  }
  else if (tidstype === Tid.tidstype.PERIODE) {
    expect(pdfTid.perioder.label).toEqual(expectedLabel);
    expect(pdfTid.perioder.verdi.length).toEqual(expectedAntallPerioder);
  }
}

interface ExpectedRolletype {
  kode: string,
  navn: string
}

interface ExpectedAdresse {
  adresselinje1: string,
  adresselinje2: string,
  adresselinje3: string,
  land: string
}

interface ExpectedTid {
  verdi1: string, // kan være dato eller fra dato
  verdi2: string, // kan være klokkeslett eller til dato
}

const formatDate = (date: any, formatStr: string) =>
  format(date, formatStr, { locale: nb });

