/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Periode } from './Periode';

export type Tid = {
    tidstype: Tid.tidstype;
    tidspunkt?: string;
    perioder?: Array<Periode>;
    ukjent?: boolean;
    sykdomPaavist?: string;
};

export namespace Tid {

    export enum tidstype {
        TIDSPUNKT = 'Tidspunkt',
        PERIODE = 'Periode',
        UKJENT = 'Ukjent',
    }


}
