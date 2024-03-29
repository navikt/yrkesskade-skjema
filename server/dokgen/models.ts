export interface Soknadsfelt<T> {
  label: string;
  verdi: T;
}

export interface PdfInnmelder {
  norskIdentitetsnummer: Soknadsfelt<string>;
  navn?: Soknadsfelt<string>;
  paaVegneAv: Soknadsfelt<string>;
  innmelderrolle: Soknadsfelt<string>;
  altinnrolleIDer: Soknadsfelt<string[]>;
}

export interface PdfSkadelidt {
  norskIdentitetsnummer: Soknadsfelt<string>;
  navn?: Soknadsfelt<string>,
  bostedsadress?: Soknadsfelt<PdfAdresse>;
  dekningsforhold: PdfDekningsforhold;
}

export interface PdfDekningsforhold {
  organisasjonsnummer: Soknadsfelt<string>;
  navnPaaVirksomheten?: Soknadsfelt<string>;
  stillingstittelTilDenSkadelidte: Soknadsfelt<string[]>;
  rolletype: Soknadsfelt<PdfRolletype>;
  virksomhetensAdresse?: Soknadsfelt<PdfAdresse>;
  tjenesteperiode?: Soknadsfelt<PdfPeriode>;
  tjenestegjoerendeAvdeling?: Soknadsfelt<string>;
}

export interface PdfRolletype {
  kode: string,
  navn: string
}

export interface PdfSkade {
  alvorlighetsgrad?: Soknadsfelt<string>,
  skadedeDeler: PdfSkadetDel[],
  antattSykefravaer: Soknadsfelt<string>
}

export interface PdfSkadetDel {
  kroppsdel: Soknadsfelt<string>,
  skadeart: Soknadsfelt<string>
}

export interface PdfHendelsesfakta {
  tid: PdfTid,
  naarSkjeddeUlykken: Soknadsfelt<string>,
  hvorSkjeddeUlykken: Soknadsfelt<string>,
  ulykkessted: PdfUlykkessted,
  paavirkningsform: Soknadsfelt<string[]>
  aarsakUlykke: Soknadsfelt<string[]>,
  bakgrunnsaarsak: Soknadsfelt<string[]>,
  stedsbeskrivelse: Soknadsfelt<string>,
  utfyllendeBeskrivelse?: Soknadsfelt<string>
}

export interface PdfAdresse {
  adresselinje1?: string;
  adresselinje2?: string;
  adresselinje3?: string;
  land?: string;
}

export interface PdfTid {
  tidstype: string;
  tidspunkt?: Soknadsfelt<PdfTidspunkt>;
  perioder?: Soknadsfelt<PdfPeriode[]>;
  sykdomPaavist?: Soknadsfelt<string>;
  ukjent?: boolean;
}

export interface PdfTidspunkt {
  dato: string;
  klokkeslett: string;
}

export interface PdfPeriode {
  fra: string;
  til: string;
}

export interface PdfUlykkessted {
  sammeSomVirksomhetensAdresse: Soknadsfelt<string>;
  adresse: Soknadsfelt<PdfAdresse>;
}

export interface PdfSkademelding {
  innmelder: PdfInnmelder;
  skadelidt: PdfSkadelidt,
  skade: PdfSkade,
  hendelsesfakta: PdfHendelsesfakta,
  dokumentInfo: PdfDokumentInfo
}

export interface PdfDokumentInfo {
  dokumentnavn: string,
  dokumentnummer: string,
  dokumentDatoPrefix: string,
  dokumentDato: string,
  tekster: PdfTekster,
  annet: PdfAnnet
}

export interface PdfTekster {
  innmelderSeksjonstittel: string,
  tidOgStedSeksjonstittel: string,
  skadelidtSeksjonstittel: string,
  omUlykkenSeksjonstittel: string,
  omSkadenSeksjonstittel: string,
  omSkadenFlereSkader: string
}

export interface PdfAnnet {
  erSykdom: boolean
}
