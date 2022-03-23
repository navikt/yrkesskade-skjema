/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { KodekategoriResponsDto } from '../models/KodekategoriResponsDto';
import type { KodetypeResponsDto } from '../models/KodetypeResponsDto';
import type { KodeverdiResponsDto } from '../models/KodeverdiResponsDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class KodeverkControllerService {

    /**
     * @returns KodetypeResponsDto OK
     * @throws ApiError
     */
    public static hentKodeverktyper(): CancelablePromise<KodetypeResponsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kodeverk/typer',
        });
    }

    /**
     * @param typenavn
     * @returns KodekategoriResponsDto OK
     * @throws ApiError
     */
    public static hentKodeverkkategorier(
        typenavn: string,
    ): CancelablePromise<KodekategoriResponsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kodeverk/typer/{typenavn}/kategorier',
            path: {
                'typenavn': typenavn,
            },
        });
    }

    /**
     * @param typenavn
     * @param kategorinavn
     * @returns KodeverdiResponsDto OK
     * @throws ApiError
     */
    public static hentKodeverdiForTypeOgKategori(
        typenavn: string,
        kategorinavn: string,
    ): CancelablePromise<KodeverdiResponsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/kodeverk/typer/{typenavn}/kategorier/{kategorinavn}/kodeverdier',
            path: {
                'typenavn': typenavn,
                'kategorinavn': kategorinavn,
            },
        });
    }

}