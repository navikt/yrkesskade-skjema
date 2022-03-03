/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdresseDto } from './AdresseDto';

export type OrganisasjonDto = {
    organisasjonsnummer?: string;
    navn?: string;
    naeringskode?: string;
    organisasjonsform?: string;
    status?: string;
    type?: string;
    postadresse?: AdresseDto;
    forretningsadresse?: AdresseDto;
    beliggenhetsadresse?: AdresseDto;
    antallAnsatte?: number;
};
