/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Innmelder = {
    norskIdentitetsnummer: string;
    paaVegneAv: string;
    innmelderrolle: Innmelder.innmelderrolle;
    altinnrolleIDer?: Array<string>;
};

export namespace Innmelder {

    export enum innmelderrolle {
        VIRKSOMHETSREPRESENTANT = 'Virksomhetsrepresentant',
    }


}
