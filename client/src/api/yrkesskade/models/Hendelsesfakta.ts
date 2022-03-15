/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Tid } from './Tid';
import type { Ulykkessted } from './Ulykkessted';

export type Hendelsesfakta = {
    tid: Tid;
    naarSkjeddeUlykken: Hendelsesfakta.naarSkjeddeUlykken;
    hvorSkjeddeUlykken: Hendelsesfakta.hvorSkjeddeUlykken;
    ulykkessted: Ulykkessted;
    aarsakUlykkeTabellAogE: Array<'Støt/treff av gjenstand' | 'Trafikkulykke' | 'Sammenstøt, bitt, spark, osv. (dyr eller menneske)' | 'Sammenstøt med gjenstand eller påkjørsel' | 'Velt' | 'Klemt/fanget' | 'Fall av person' | 'Stukket/kuttet av skarp/spiss gjenstand' | 'Kontakt med elektrisk spenning, farlige stoffer' | 'Høy temperatur' | 'Lav temperatur' | 'Kjemikalier' | 'Eksplosjon, sprenging, brann' | 'Trusler om vold' | 'Påført voldsskade' | 'Druknet, begravd, omsvøpt' | 'Fysisk eller psykisk belastning' | 'Alternativene passer ikke'>;
    bakgrunnsaarsakTabellBogG: Array<'Manglende merking, varsling, skilting' | 'Mangelfulle sikkerhetsrutiner' | 'Utilstrekkelig sikring' | 'Vernetiltak ikke/delvis gjennomført' | 'Verneutstyr satt ut av funksjon' | 'Verneutstyr fjernet' | 'Uautorisert bruk av utstyr' | 'Defekt utstyr' | 'Feil bruk eller tap av kontroll (helt eller delvis) over maskin, transportmiddel, utstyr for å forflytte materiale, håndholdt verktøy, gjenstand, dyr' | 'Feil pålasting' | 'Feil plassering' | 'Feil løfting' | 'Feil utførelse av oppgaven' | 'Mangelfull opplæring' | 'Angrepet/truet av en annen person' | 'Uforsvarlig «lek», spøk eller veddemål' | 'Påvirkning av alkohol/andre rusmidler' | 'Bedriftsidrett eller lignende' | 'Avvik som følge av elektriske problemer, eksplosjon, brann' | 'Avvik som følge av overstrømning, velt, lekkasje, utstrømning, avdamping, utstråling' | 'Bristing, sprengning, oppsplitting, glidning, fall, ytre faktor kollapser' | 'Glidning, snubling' | 'Kroppsbevegelse uten fysisk belastning (som vanligvis fører til en ytre skade)' | 'Kroppsbevegelse under eller med fysisk belastning (som vanligvis fører til en indre skade)' | 'Tistedeværelse ved vold, aggresjon, trussel' | 'Alternativene passer ikke'>;
    stedsbeskrivelseTabellF: Hendelsesfakta.stedsbeskrivelseTabellF;
    utfyllendeBeskrivelse?: string;
};

export namespace Hendelsesfakta {

    export enum naarSkjeddeUlykken {
        I_AVTALT_ARBEIDSTID = 'I avtalt arbeidstid',
        UTENFOR_ARBEIDSTID = 'Utenfor arbeidstid',
        UNDER_PERMISJON = 'Under permisjon',
        UNDER_FULL_SYKEMELDING = 'Under full sykemelding',
        FRITID_PRIVAT_AKTIVITET = 'Fritid/ privat aktivitet',
        HVILENDE_VAKT = 'Hvilende vakt',
        UNDER_FRIVILLIG_ARBEID = 'Under frivillig arbeid',
        UNDER_REDNINGSARBEID_VAKTHOLD_ELLER_REDNINGS_VELSE = 'Under redningsarbeid, vakthold eller redningsøvelse',
        ALTERNATIVENE_PASSER_IKKE = 'Alternativene passer ikke',
    }

    export enum hvorSkjeddeUlykken {
        P_ARBEIDSSTEDET_INNE = 'På arbeidsstedet inne',
        P_ARBEIDSSTEDET_UTE = 'På arbeidsstedet ute',
        P_ARBEIDSSTEDET_LUKKET_OMR_DET = 'På arbeidsstedet lukket området',
        P_VEG_TIL_FRA_ARBEIDSSTEDET = 'På veg til/fra arbeidsstedet',
        KOMMET_FREM_TIL_P_MIDLERTIDIG_ARBEIDSSTED = 'Kommet frem til/på midlertidig arbeidssted',
        P_VEG_MELLOM_ARBEIDSSTEDER = 'På veg mellom arbeidssteder',
        OFFENTLIG_STED = 'Offentlig sted',
        AVTALT_HJEMMEKONTOR = 'Avtalt hjemmekontor',
    }

    export enum stedsbeskrivelseTabellF {
        PLASS_FOR_INDUSTRIELL_VIRKSOMHET = 'Plass for industriell virksomhet',
        ANLEGGSOMR_DE_BYGGEPLASS_DAGBRUDDSSTEINBRUDD_DAGBRUDDSGRUVE = 'Anleggsområde, byggeplass, dagbruddssteinbrudd, dagbruddsgruve',
        PLASS_FOR_JORDBRUK_AVL_AV_DYR_FISKEOPPDRETT_SKOGBRUK = 'Plass for jordbruk, avl av dyr, fiskeoppdrett, skogbruk',
        PLASS_FOR_SERVICEVIRKSOMHET_KONTOR_FORN_YELSER_DIVERSE = 'Plass for servicevirksomhet, kontor, fornøyelser, diverse',
        HELSEINSTITUSJONER = 'Helseinstitusjoner',
        OFFENTLIG_STED = 'Offentlig sted',
        HJEMME = 'Hjemme',
        IDRETTSOMR_DE = 'Idrettsområde',
        I_LUFTEN_OVER_BAKKENIV_EKSKL_ANLEGGSOMR_DER = 'I luften, over bakkenivå, ekskl. anleggsområder',
        UNDER_JORDOVERFLATEN_EKSKL_ANLEGGSOMR_DER = 'Under jordoverflaten, ekskl. anleggsområder',
        P_OVER_VANN_EKSKL_ANLEGGSOMR_DER = 'På/over vann, ekskl. anleggsområder',
        I_H_YTRYKKSOMGIVELSER_EKSKL_ANLEGGSOMR_DER = 'I høytrykksomgivelser, ekskl. anleggsområder',
        ALTERNATIVENE_PASSER_IKKE = 'Alternativene passer ikke',
    }


}
