export interface Brukerinfo {
  fnr: number;
  navn: string;
  organisasjoner: Organisasjon[];
}

export interface Organisasjon {
  organisasjonsnummer: string;
  navn: string;
  naeringskode: string;
  organisasjonsform: string;
  status: string;
  type: string;
  postadresse?: Adresse;
  forretningsadresse?: Adresse;
  beliggenhetsadresse?: Adresse;
  antallAnsatte?: number;
}

export interface Adresse {
  landkode: string;
  land: string;
  postnummer: string;
  poststed: string;
  adresser: string[];
}
