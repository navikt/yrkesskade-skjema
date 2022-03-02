/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JsonNode } from './JsonNode';

export type SkademeldingDto = {
    id?: number;
    skademelding?: JsonNode;
    kilde?: string;
    mottattTidspunkt?: string;
};
