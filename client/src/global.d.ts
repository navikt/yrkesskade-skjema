import 'little-state-machine';

declare module 'little-state-machine' {
  interface GlobalState {
    innmelder: {
      norskIdentitetsnummer: number | undefined,
      paaVegneAv: string,
      innmelderrolle: string,
      altinnrolleIDer: string[],
    },
    skadelidt: {
      norskIdentitetsnummer: string,
      dekningsforhold: {
        organisasjonsnummer: string,
        navnPaaVirksomheten: string,
        stillingstittelTilDenSkadelidte: string,
        rolletype: string,
      },
    },
    skade: {
      alvorlighetsgrad: string,
      skadedeDeler: {kroppsdelTabellD:string, skadeartTabellC:string}[],
      antattSykefravaerTabellH: string,
    },
    hendelsesfakta: {
      tid: {
        tidspunkt: Date | undefined,
        periode: {
          fra: Date | undefined,
          til: Date | undefined,
        },
        ukjent: boolean,
        tidstype: string,
      },
      naarSkjeddeUlykken: string,
      hvorSkjeddeUlykken: string,
      ulykkessted: {
        sammeSomVirksomhetensAdresse: boolean | undefined,
        adresse: {
          adresselinje1: string | undefined,
          adresselinje2: string | undefined,
          adresselinje3: string | undefined,
          land: string | undefined,
        },
      },
      aarsakUlykkeTabellAogE: string[],
      bakgrunnsaarsakTabellBogG: string[],
      utfyllendeBeskrivelse: string,
      stedsbeskrivelseTabellF: string,
    },
  }
}
