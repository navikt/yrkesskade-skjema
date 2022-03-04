import { GlobalState } from 'little-state-machine';
import ulykkessted from '../assets/Lists/ulykkessted';

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
  innmelder: {
    ...state.innmelder,
    norskIdentitetsnummer: payload.norskIdentitetsnummer,
    innmelderrolle: payload.innmelderrolle,
  },
});

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
      rolletype: 'Arbeidstaker'
    },
  },
});

const oppdaterSkade = (
  state: GlobalState,
  payload: any // sett rett type
) => ({
  ...state,
  skade: payload,
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

export {
  oppdaterPaaVegneAv,
  oppdaterInnmelder,
  oppdaterDekningsforholdOrganisasjon,
  oppdaterSkade,
  oppdaterSetSammeSomVirksomhetsAdresse
};
