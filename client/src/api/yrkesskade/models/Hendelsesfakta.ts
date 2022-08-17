/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Tid } from './Tid';
import type { Ulykkessted } from './Ulykkessted';

export type Hendelsesfakta = {
    tid: Tid;
    naarSkjeddeUlykken: string;
    hvorSkjeddeUlykken?: string;
    ulykkessted?: Ulykkessted;
    aarsakUlykke?: Array<string>;
    bakgrunnsaarsak?: Array<string>;
    utfyllendeBeskrivelse?: string;
    stedsbeskrivelse?: string;
    paavirkningsform?: Array<string>;
    tjenestegjorendeavdeling?: string;
};
