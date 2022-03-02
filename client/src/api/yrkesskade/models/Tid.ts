/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TidPeriode } from './TidPeriode';

export type Tid = {
    tidstype: Tid.tidstype;
    tidspunkt?: string;
    periode?: TidPeriode;
    ukjent?: boolean;
};

export namespace Tid {

    export enum tidstype {
        TIDSPUNKT = 'Tidspunkt',
        PERIODE = 'Periode',
        UKJENT = 'Ukjent',
    }


}
