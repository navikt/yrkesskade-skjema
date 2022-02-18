export interface Brukerinfo {
  fnr: number;
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
}

export interface Adresse {
  landkode: string;
  land: string;
  postnummer: string;
  poststed: string;
  adresser: string[];
}
