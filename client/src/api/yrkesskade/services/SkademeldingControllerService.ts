/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JsonNode } from '../models/JsonNode';
import type { SkademeldingDto } from '../models/SkademeldingDto';
import type { Unit } from '../models/Unit';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SkademeldingControllerService {

    /**
     * @returns SkademeldingDto OK
     * @throws ApiError
     */
    public static hentSkademeldinger(): CancelablePromise<Array<SkademeldingDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/midlertidig/skademeldinger',
        });
    }

    /**
     * @param requestBody
     * @returns SkademeldingDto OK
     * @throws ApiError
     */
    public static mottaSkademelding(
        requestBody: JsonNode,
    ): CancelablePromise<SkademeldingDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/midlertidig/skademeldinger',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns SkademeldingDto OK
     * @throws ApiError
     */
    public static hentSkademeldingMedId(
        id: number,
    ): CancelablePromise<SkademeldingDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/midlertidig/skademeldinger/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @returns Unit OK
     * @throws ApiError
     */
    public static slettSkademelding(
        id: number,
    ): CancelablePromise<Unit> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/midlertidig/skademeldinger/{id}',
            path: {
                'id': id,
            },
        });
    }

}