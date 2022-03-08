export const initialState = {
  innmelder: {
    norskIdentitetsnummer: undefined,
    paaVegneAv: '',
    innmelderrolle: 'Virksomhetsrepresentant',
    altinnrolleIDer: [],
  },
  skadelidt: {
    norskIdentitetsnummer: '',
    dekningsforhold: {
      organisasjonsnummer: '',
      navnPaaVirksomheten: '',
      stillingstittelTilDenSkadelidte: '',
      rolletype: '',
    },
  },
  skade: {
    alvorlighetsgrad: '',
    skadedeDeler: [],
    antattSykefravaerTabellH: '',
  },
  hendelsesfakta: {
    tid: {
      tidspunkt: null,
      periode: {
        fra: null,
        til: null,
      },
      ukjent: false,
      tidstype: 'Tidspunkt',
    },
    naarSkjeddeUlykken: '',
    hvorSkjeddeUlykken: '',
    ulykkessted: {
      sammeSomVirksomhetensAdresse: false,
      adresse: {
        adresselinje1: undefined,
        adresselinje2: undefined,
        adresselinje3: undefined,
        land: undefined,
      },
    },
    aarsakUlykkeTabellAogE: [],
    bakgrunnsaarsakTabellBogG: [],
    utfyllendeBeskrivelse: '',
    stedsbeskrivelseTabellF: '',
  },
}

export const formState = initialState;

