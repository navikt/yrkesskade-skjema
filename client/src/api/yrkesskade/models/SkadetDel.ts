/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SkadetDel = {
    skadeartTabellC: SkadetDel.skadeartTabellC;
    kroppsdelTabellD: SkadetDel.kroppsdelTabellD;
};

export namespace SkadetDel {

    export enum skadeartTabellC {
        BL_TDELSSKADE_UTEN_S_R_KLEMSKADE_ = 'Bløtdelsskade uten sår (klemskade)',
        S_RSKADE = 'Sårskade',
        TAP_AV_LEGEMSDEL = 'Tap av legemsdel',
        FORSTUING_FORVRIDNING = 'Forstuing, forvridning',
        KNOKKELBRUDD = 'Knokkelbrudd',
        VARMESKADE = 'Varmeskade',
        KULDESKADE = 'Kuldeskade',
        ETSING = 'Etsing',
        AKUTT_FORGIFTNING = 'Akutt forgiftning',
        PSYKISKE_ETTERVIRKNINGER = 'Psykiske ettervirkninger',
        ANNET = 'Annet',
    }

    export enum kroppsdelTabellD {
        HODE = 'Hode',
        ANSIKT = 'Ansikt',
        _YE_VENSTRE = 'Øye, venstre',
        _YE_H_YRE = 'Øye, høyre',
        _RE_VENSTRE = 'Øre, venstre',
        _RE_H_YRE = 'Øre, høyre',
        TENNER = 'Tenner',
        HALS_NAKKE = 'Hals/nakke',
        RYGG = 'Rygg',
        RIBBEN_SKULDERBLAD = 'Ribben/skulderblad',
        BRYSTKASSE_LUNGER_HJERTE_SPISER_R = 'Brystkasse/lunger/hjerte/spiserør',
        MAVE_BEKKEN_FORD_YELSESORGANER_NYRE_URINVEIER = 'Mave/bekken/fordøyelsesorganer/nyre/urinveier',
        SKULDER_VENSTRE = 'Skulder, venstre',
        SKULDER_H_YRE = 'Skulder, høyre',
        ARM_ALBUE_VENSTRE = 'Arm/albue, venstre',
        ARM_ALBUE_H_YRE = 'Arm/albue, høyre',
        H_NDLEDD_VENSTRE = 'Håndledd, venstre',
        H_NDLEDD_H_YRE = 'Håndledd, høyre',
        H_ND_VENSTRE = 'Hånd, venstre',
        H_ND_H_YRE = 'Hånd, høyre',
        FINGRE_VENSTRE = 'Fingre, venstre',
        FINGRE_H_YRE = 'Fingre, høyre',
        HOFTE_VENSTRE = 'Hofte, venstre',
        HOFTE_H_YRE = 'Hofte høyre',
        BEN_M_KNE_VENSTRE = 'Ben m/kne, venstre',
        BEN_M_KNE_H_YRE = 'Ben m/kne, høyre',
        ANKEL_VENSTRE = 'Ankel, venstre',
        ANKEL_H_YRE = 'Ankel, høyre',
        FOT_VENSTRE = 'Fot, venstre',
        FOT_H_YRE = 'Fot, høyre',
        T_R_VENSTRE = 'Tær, venstre',
        T_R_H_YRE = 'Tær, høyre',
        HELE_KROPPEN_ALLMENN_FORGIFTNING_ALLMENN_NEDKJ_LING_E_L_ = 'Hele kroppen (allmenn forgiftning, allmenn nedkjøling, e.l.)',
    }


}
