export interface IGeneralForm {
  innmelder: ISender;
  skadelidt: IInjured;
  skade: IInjury;
  hendelsesfakta: IAccident;
}

export interface ISender {
  foedselsnummer: number | undefined;
  navn: string | undefined;
  paaVegneAvOrgnr: string | undefined;
  innmelderrolle: string | undefined;
  altinnrolle: string | undefined;
}

export interface IInjured {
  foedselsnummer: string | undefined;
  navn: string | undefined;
  arbeidsforhold: IInjuredEmployment;
}

export interface IInjuredEmployment {
  organisasjonsnummer: string | undefined;
  navn: string | undefined;
  stillingstittel: string | undefined;
  yrke: string | undefined;
  rolletype: string | undefined;
}

export interface IInjury {
  alvorlighetsgrad: string | undefined;
  legeKontaktet: string | undefined;
  skadeartTabellC: string | undefined;
  kroppsdelTabellD: string | undefined;
  antattSykefravaerTabellH: string | undefined;
}

export interface IAccident {
  tid: IAccidentTime;
  naarSkjeddeUlykken: string | undefined;
  naarSkjeddeUlykkenFritekst: string | undefined;
  hvorSkjeddeUlykken: string | undefined;
  ulykkessted: IAccidentPlace;
  typeUlykkeTabellA: string | undefined;
  bakgrunnsaarsakTabellB: string | undefined;
  utfyllendeBeskrivelse: string | undefined;
  utloesendeFaktorTabellE: string | undefined;
  arbeidsplassbeskrivelseTabellF: string | undefined;
  arbeidsforholdsavvikTabellG: string | undefined;
}

export interface IAccidentTime {
  dato: string | undefined;
  tidspunkt: string | undefined;
  periode: IAccidentTimePeriod;
  ukjent: boolean | undefined;
  tidstype: string | undefined;
  tidstypeAnnet: string | undefined;
}
export interface IAccidentTimePeriod {
  fra: string | undefined;
  til: string | undefined;
}
export interface IAccidentPlace {
  sammeSomArbeidsgiversAdresse: boolean | undefined;
  adresse: string | undefined;
}
