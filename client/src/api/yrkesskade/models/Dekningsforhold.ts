/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Adresse } from './Adresse';

export type Dekningsforhold = {
    organisasjonsnummer: string;
    rolletype: string;
    navnPaaVirksomheten?: string;
    virksomhetensAdresse?: Adresse;
    stillingstittelTilDenSkadelidte?: Array<string>;
};
