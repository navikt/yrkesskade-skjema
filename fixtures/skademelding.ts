import { Skademelding, SkadetDel, Tid } from '../client/src/api/yrkesskade';

export const fixtures: { [key: string]: (Date) => Skademelding } = {
  full: (tidspunkt: Date): Skademelding => {
    return {
      innmelder: {
        norskIdentitetsnummer: '12345678910',
        paaVegneAv: '123456789',
        innmelderrolle: 'virksomhetsrepresentant',
        altinnrolleIDer: ['1', '2'],
      },
      skadelidt: {
        norskIdentitetsnummer: '2345678901',
        dekningsforhold: {
          organisasjonsnummer: '123456789',
          rolletype: 'arbeidstaker',
          navnPaaVirksomheten: 'Ork og Lidelse AS',
          virksomhetensAdresse: {
            adresselinje1: 'Testveien 1',
            adresselinje2: '1111',
            adresselinje3: 'TEST',
            land: 'NO',
          },
          stillingstittelTilDenSkadelidte: [''],
        },
      },
      skade: {
        skadedeDeler: [
          {
            kroppsdelTabellD: 'hode',
            skadeartTabellC: 'saarskade',
          } as SkadetDel,
        ],
        alvorlighetsgrad: 'antattOppsoektLege',
        antattSykefravaerTabellH: 'treDagerEllerMindre',
      },
      hendelsesfakta: {
        tid: {
          tidstype: Tid.tidstype.TIDSPUNKT,
          tidspunkt: tidspunkt.toISOString(),
          periode: {
            fra: '',
            til: '',
          },
          ukjent: false,
        },
        naarSkjeddeUlykken: 'iAvtaltArbeidstid',
        hvorSkjeddeUlykken: 'arbeidsstedInne',
        ulykkessted: {
          sammeSomVirksomhetensAdresse: false,
          adresse: {
            adresselinje1: 'Testveien 2',
            adresselinje2: '1112',
            adresselinje3: 'TOAST',
            land: 'NO',
          },
        },
        aarsakUlykkeTabellAogE: ['stukketEllerKuttet', 'stoetEllerTreffAvGjenstand'],
        bakgrunnsaarsakTabellBogG: ['manglendeMerkingEllerVarsling', 'verneutstyrUtAvFunksjon'],
        utfyllendeBeskrivelse: 'Dette er en utfyllende beskrivelse',
        stedsbeskrivelseTabellF: 'anleggsomraadeEllerByggeplassEllerStenbruddEllerGruve',
      },
    };
  },
};