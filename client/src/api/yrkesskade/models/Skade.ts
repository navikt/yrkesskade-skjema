/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SkadetDel } from './SkadetDel';

export type Skade = {
    skadedeDeler: Array<SkadetDel>;
    antattSykefravaerTabellH: Skade.antattSykefravaerTabellH;
    alvorlighetsgrad?: Skade.alvorlighetsgrad;
};

export namespace Skade {

    export enum antattSykefravaerTabellH {
        FRAV_RSDAGER_UKJENT = 'Fraværsdager ukjent',
        KJENT_FRAV_R_MINDRE_ENN_3_DAGER = 'Kjent fravær mindre enn 3 dager',
        KJENT_FRAV_R_MER_ENN_3_DAGER = 'Kjent fravær mer enn 3 dager',
        ALTERNATIVENE_PASSER_IKKE = 'Alternativene passer ikke',
    }

    export enum alvorlighetsgrad {
        DET_ANTAS_AT_HELSEHJELP_IKKE_ER_OPPS_KT = 'Det antas at helsehjelp ikke er oppsøkt',
        DET_ANTAS_AT_HELSEHJELP_ER_OPPS_KT = 'Det antas at helsehjelp er oppsøkt',
        ALVORLIG_KREFTSYKDOM = 'Alvorlig kreftsykdom',
        ANDRE_LIVSTRUENDE_SYKDOM_SKADE = 'Andre livstruende sykdom/skade',
        D_DSFALL = 'Dødsfall',
    }


}
