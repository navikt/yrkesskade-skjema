/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Skademelding } from '../models/Skademelding';
import type { Unit } from '../models/Unit';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SkademeldingApiControllerService {

    /**
     * @param requestBody
     * @returns Unit OK
     * @throws ApiError
     */
    public static sendSkademelding(
        requestBody: Skademelding,
    ): CancelablePromise<Unit> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/skademeldinger',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}