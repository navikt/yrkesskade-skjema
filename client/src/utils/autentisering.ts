import axios, { AxiosError } from "axios";

// interne hjelpe metoder
const er401Feil = (error: AxiosError) => (error?.response?.status === 401);

const getLoginUrl = () => {
    return `/yrkesskade/redirect-til-login?redirect=${window.location.origin}/yrkesskade/`;
};

export enum InnloggetStatus {
    IKKE_VERIFISERT,
    IKKE_INNLOGGET,
    INNLOGGET,
    FEILET,
}

export interface InnloggetBruker {
  fnr: number;
}

export const autentiseringsInterceptor = () => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error: AxiosError) => {
            if (er401Feil(error)) {
                window.location.href = getLoginUrl();
            }

            return Promise.reject(error.response);
        }
    );
};
