/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AltinnRolleDto } from '../models/AltinnRolleDto';
import type { BrukerinfoDto } from '../models/BrukerinfoDto';
import type { OrganisasjonDto } from '../models/OrganisasjonDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BrukerinfoControllerService {

    /**
     * @returns BrukerinfoDto OK
     * @throws ApiError
     */
    public static hentUserInfo(): CancelablePromise<BrukerinfoDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/brukerinfo',
        });
    }

    /**
     * @param organisasjonsnummer
     * @returns OrganisasjonDto OK
     * @throws ApiError
     */
    public static hentOrganisasjon(
        organisasjonsnummer: string,
    ): CancelablePromise<OrganisasjonDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/brukerinfo/organisasjoner/{organisasjonsnummer}',
            path: {
                'organisasjonsnummer': organisasjonsnummer,
            },
        });
    }

    /**
     * @param organisasjonsnummer
     * @returns AltinnRolleDto OK
     * @throws ApiError
     */
    public static hentRoller(
        organisasjonsnummer: string,
    ): CancelablePromise<Array<AltinnRolleDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/brukerinfo/organisasjoner/{organisasjonsnummer}/roller',
            path: {
                'organisasjonsnummer': organisasjonsnummer,
            },
        });
    }

}