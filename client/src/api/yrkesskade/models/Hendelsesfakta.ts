/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Tid } from './Tid';
import type { Ulykkessted } from './Ulykkessted';

export type Hendelsesfakta = {
    tid: Tid;
    naarSkjeddeUlykken: string;
    hvorSkjeddeUlykken: string;
    ulykkessted: Ulykkessted;
    aarsakUlykkeTabellAogE: Array<string>;
    bakgrunnsaarsakTabellBogG: Array<string>;
    stedsbeskrivelseTabellF: string;
    utfyllendeBeskrivelse?: string;
};
