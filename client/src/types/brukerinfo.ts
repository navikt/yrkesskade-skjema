export interface Brukerinfo {
  fnr: number;
  organisasjoner: Organisasjon[];
}

export interface Organisasjon {
  organisasjonsnummer: number;
  navn: string;
  naeringskode: string;
  organisasjonsform: string;
  status: string;
  type: string;
}
