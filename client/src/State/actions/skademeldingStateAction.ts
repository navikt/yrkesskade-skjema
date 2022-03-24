import { GlobalState } from 'little-state-machine';
import { merge } from 'lodash';

const oppdaterPaaVegneAv = (state: GlobalState, payload: string) => ({
  ...state,
  innmelder: {
    ...state.innmelder,
    paaVegneAv: payload,
  },
});

const oppdaterInnmelder = (
  state: GlobalState,
  payload: { norskIdentitetsnummer: number; innmelderrolle: string }
) => ({
  ...state,
  innmelder: merge(state.innmelder, payload)
});

const oppdaterRollerForOrganisasjon = (
  state: GlobalState,
  payload: string[]
) => ({
  ...state,
  innmelder: {
    ...state.innmelder,
    altinnrolleIDer: payload
  }
})

const oppdaterDekningsforholdOrganisasjon = (
  state: GlobalState,
  payload: { organisasjonsnummer: string, navn: string }
) => ({
  ...state,
  skadelidt: {
    ...state.skadelidt,
    dekningsforhold: {
      ...state.skadelidt.dekningsforhold,
      organisasjonsnummer: payload.organisasjonsnummer,
      navnPaaVirksomheten: payload.navn,
      // rolletype: 'Arbeidstaker'
    },
  },
});

const oppdaterSkade = (
  state: GlobalState,
  payload: any // sett rett type
) => ({
  ...state,
  skade: merge(state.skade, payload),
});

const oppdaterSetSammeSomVirksomhetsAdresse = (state: GlobalState, payload: boolean) => ({
  ...state,
  hendelsesfakta: {
    ...state.hendelsesfakta,
    ulykkessted: {
      ...state.hendelsesfakta.ulykkessted,
      sammeSomVirksomhetensAdresse: payload
    }
  }
})

const oppdaterUlykkesstedAdresse = (state: GlobalState, payload: { adresselinje1: string, adresselinje2: string, adresselinje3: string, land: string}) => ({
  ...state,
  hendelsesfakta: {
    ...state.hendelsesfakta,
    ulykkessted: {
      ...state.hendelsesfakta.ulykkessted,
      adresse: merge(state.hendelsesfakta.ulykkessted.adresse, payload)
    }
  }
})

const oppdaterSkadedeDeler = (state: GlobalState, payload: {kroppsdelTabellD: string, skadeartTabellC: string}[]) => ({
  ...state,
  skade: {
    ...state.skade,
    skadedeDeler: payload
  }
})

export {
  oppdaterPaaVegneAv,
  oppdaterInnmelder,
  oppdaterRollerForOrganisasjon,
  oppdaterDekningsforholdOrganisasjon,
  oppdaterSkade,
  oppdaterSetSammeSomVirksomhetsAdresse,
  oppdaterUlykkesstedAdresse,
  oppdaterSkadedeDeler
};
