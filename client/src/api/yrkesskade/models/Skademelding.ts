/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Hendelsesfakta } from './Hendelsesfakta';
import type { Innmelder } from './Innmelder';
import type { Skade } from './Skade';
import type { Skadelidt } from './Skadelidt';

export type Skademelding = {
    innmelder?: Innmelder;
    skadelidt?: Skadelidt;
    skade?: Skade;
    hendelsesfakta?: Hendelsesfakta;
};
