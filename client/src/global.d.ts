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
        tidspunkt: Date | null,
        periode: {
          fra: Date | null,
          til: Date | null,
        },
        ukjent: boolean,
        tidstype: string,
      },
      naarSkjeddeUlykken: string,
      hvorSkjeddeUlykken: string,
      ulykkessted: {
        sammeSomVirksomhetensAdresse: boolean,
        adresse: {
          adresselinje1: string,
          adresselinje2: string,
          adresselinje3: string,
          land: string,
        },
      },
      aarsakUlykkeTabellAogE: string,
      bakgrunnsaarsakTabellBogG: string,
      utfyllendeBeskrivelse: string,
      stedsbeskrivelseTabellF: string,
    },
  }
}
