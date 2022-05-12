/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrganisasjonDto } from './OrganisasjonDto';

export type BrukerinfoDto = {
    fnr: string;
    navn: string;
    organisasjoner: Array<OrganisasjonDto>;
};
