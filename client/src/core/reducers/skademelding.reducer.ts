import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { merge } from "lodash";
import { Dekningsforhold, Innmelder, Periode, Skade, Skadelidt, Skademelding, SkadetDel, Tid } from "../../api/yrkesskade";
import { RootState } from "../store";

interface SkademeldingState {
  skademelding: Skademelding;
}

const initialState: SkademeldingState = {
  skademelding: {
    innmelder: {
      norskIdentitetsnummer: '',
      paaVegneAv: '',
      innmelderrolle: 'virksomhetsrepresentant',
      altinnrolleIDer: [],
    },
    skadelidt: {
      norskIdentitetsnummer: '',
      dekningsforhold: {
        organisasjonsnummer: '',
        navnPaaVirksomheten: '',
        virksomhetensAdresse: undefined,
        stillingstittelTilDenSkadelidte: [],
        rolletype: '',
      },
    },
    skade: {
      alvorlighetsgrad: '',
      skadedeDeler: [],
      antattSykefravaer: '',
    },
    hendelsesfakta: {
      tid: {
        tidspunkt: undefined,
        perioder: undefined,
        ukjent: false,
        tidstype: Tid.tidstype.TIDSPUNKT,
      },
      naarSkjeddeUlykken: '',
      hvorSkjeddeUlykken: '',
      ulykkessted: {
        sammeSomVirksomhetensAdresse: true,
        adresse: {
          adresselinje1: '',
          adresselinje2: undefined,
          adresselinje3: undefined,
          land: undefined,
        },
      },
      aarsakUlykke: [],
      bakgrunnsaarsak: [],
      utfyllendeBeskrivelse: '',
      stedsbeskrivelse: '',
      paavirkningsform: undefined,
    }
  }
}

export const skademeldingSlice = createSlice({
  name: 'skadmelding',
  initialState,
  reducers: {
    oppdaterSkademelding: (
      state,
      action: PayloadAction<Skademelding>
    ) => {
      if (state.skademelding.skade?.skadedeDeler) {
        // vi skal ikke merge denne listen
        state.skademelding.skade.skadedeDeler = [];
      }
      if (state.skademelding.hendelsesfakta.paavirkningsform) {
         // vi skal ikke merge denne listen
        state.skademelding.hendelsesfakta.paavirkningsform = [];
      }
      if (state.skademelding.hendelsesfakta.bakgrunnsaarsak) {
         // vi skal ikke merge denne listen
        state.skademelding.hendelsesfakta.bakgrunnsaarsak = []
      }
      if (state.skademelding.hendelsesfakta.aarsakUlykke) {
        // vi skal ikke merge denne listen
        state.skademelding.hendelsesfakta.aarsakUlykke = [];
      }
      state.skademelding = merge(state.skademelding, action.payload);
    },
    oppdaterInnmelder: (
      state,
      action: PayloadAction<Innmelder>
    ) => {
      state.skademelding.innmelder = merge(state.skademelding.innmelder, action.payload);
    },
    oppdaterAltinnRoller: (state, action: PayloadAction<string[]>) => {
      if (state.skademelding.innmelder) {
        state.skademelding.innmelder.altinnrolleIDer = action.payload;
      }
    },
    oppdaterPaaVegneAv: (
      state,
      action: PayloadAction<string>
    ) => {
      if (state.skademelding.innmelder) {
        state.skademelding.innmelder.paaVegneAv = action.payload;
      }
    },
    oppdaterSkadelidt: (state, action: PayloadAction<Skadelidt>) => {
      state.skademelding.skadelidt = merge(state.skademelding.skadelidt, action.payload);
    },
    oppdaterDekningsforhold: (state, action: PayloadAction<Dekningsforhold>) => {
      if (state.skademelding.skadelidt) {
        state.skademelding.skadelidt.dekningsforhold = action.payload;
      }
    },
    oppdaterSkade: (state, action: PayloadAction<Skade>) => {
      state.skademelding.skade = action.payload;
    },
    oppdaterSkadedeDeler: (state, action: PayloadAction<SkadetDel[]>) => {
      if (state.skademelding && state.skademelding.skade) {
        state.skademelding.skade.skadedeDeler = merge(state.skademelding?.skade.skadedeDeler, action.payload);
      }
    },
    fjernPeriode: (state, action: PayloadAction<Periode>) => {
      state.skademelding.hendelsesfakta.tid.perioder = state.skademelding.hendelsesfakta.tid.perioder?.filter(periode => periode.fra !== action.payload.fra && periode.til !== action.payload.til)
    },
    reset: () => {
      return { ...initialState };
    }
  }
})

export const selectSkademelding = (state: RootState) => state.skademelding.skademelding


export const {
  oppdaterSkademelding,
  oppdaterInnmelder,
  oppdaterPaaVegneAv,
  oppdaterSkadelidt ,
  oppdaterAltinnRoller,
  oppdaterSkade,
  oppdaterDekningsforhold,
  oppdaterSkadedeDeler,
  fjernPeriode,
  reset
} = skademeldingSlice.actions;
export default skademeldingSlice.reducer;
