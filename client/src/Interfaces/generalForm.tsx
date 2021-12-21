export default interface IGeneralForm {
avsender: ISender,
skadelidt: IInjured,
skade: IInjury,
hendelsesfakta: IAccident
}

interface ISender {
  id: number;
  navn: string;
  avsenderrolle: string;
}

interface IInjured {
  fodselsnummer: number;
  navn: string;
  telefonnummer: number;
  tilknytning: string;
  arbeidsgiver: IEmployer;
  stillingstittel: string;
  yrke: string;
}

interface IEmployer {
  organisasjonsnummer: number;
  navn: string;
  telefonnummer: number;
  andreInvolverteVirksomheter: number[];
  forsikringsselskap: string;
}

interface IPolice {
  meldtPolitiet: boolean;
  politidistrikt: string;
}

interface IInjury {
  alvorlighetsgrad: string;
  legeKontaktet: boolean;
  skadeartTabellC: string;
  kroppsdelTabellD: string;
  antattSykefravarTabellH: string;
  politiinformasjon: IPolice;
}

interface IAccidentPlace {
    sammeSomArbeidsgiversAdresse: boolean,
    adresse: {
      gatenavn: string,
      husnummer: number,
      postnummer: number,
      sted: string,
      land: string
    },
    koordinater: {
      lengdegrad: number,
      breddegrad:number
    }
}

interface IAccident {
  ulykkestidspunkt: Date,
  hvorSkjeddeUlykken: string,
  trafikkulykke: boolean,
  narmereBeskrivelseUlykkessted: string,
  narmereBeskrivelseHendelsesforlop: string,
  ulykkesarsakTabellA: string,
  bakgrunnsarsakTabellB: string,
  utlosendeFaktorTabellE: string,
  arbeidsplassbeskrivelseTabellF: string,
  arbeidsforholdsavvikTabellG: string,
  ulykkessted: IAccidentPlace,
  naarInntraffUlykken: string
}

