import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { merge } from "lodash";
import { Periode, Skademelding, SkadetDel, Tid } from "../../api/yrkesskade";
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
      aarsakUlykke: undefined,
      bakgrunnsaarsak: undefined,
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
      state.skademelding = merge(state.skademelding, action.payload);
    },
    fjernSkadetDel: (state, action: PayloadAction<SkadetDel>) => {
      state.skademelding.skade.skadedeDeler = state.skademelding.skade.skadedeDeler.filter(skadetDel => skadetDel.kroppsdel !== action.payload.kroppsdel && skadetDel.skadeart !== action.payload.skadeart)
    },
    fjernPeriode: (state, action: PayloadAction<Periode>) => {
      state.skademelding.hendelsesfakta.tid.perioder = state.skademelding.hendelsesfakta.tid.perioder?.filter(periode => periode.fra !== action.payload.fra && periode.til !== action.payload.til)
    },
    oppdaterPaavirkningsform: (state, action: PayloadAction<string[]>) => {
      state.skademelding.hendelsesfakta.paavirkningsform = action.payload
    },
    oppdaterAarsakUlykke: (state, action: PayloadAction<string[]>) => {
      state.skademelding.hendelsesfakta.aarsakUlykke = action.payload
    },
    oppdaaterBakgrunnsaarsak: (state, action: PayloadAction<string[]>) => {
      state.skademelding.hendelsesfakta.bakgrunnsaarsak = action.payload
    },
    resetPaavirkningsform: (state) => {
      state.skademelding.hendelsesfakta.paavirkningsform = undefined;
    },
    resetAarsakUlykkeOgBakgrunnAaarsak: (state) => {
      state.skademelding.hendelsesfakta.aarsakUlykke = undefined;
      state.skademelding.hendelsesfakta.bakgrunnsaarsak = undefined;
    },
    reset: () => {
      return { ...initialState };
    }
  }
})

export const selectSkademelding = (state: RootState) => state.skademelding.skademelding

export const {
  oppdaterSkademelding,
  reset,
  fjernSkadetDel,
  fjernPeriode,
  oppdaterPaavirkningsform,
  oppdaterAarsakUlykke,
  oppdaaterBakgrunnsaarsak,
  resetPaavirkningsform,
  resetAarsakUlykkeOgBakgrunnAaarsak
} = skademeldingSlice.actions;
export default skademeldingSlice.reducer;
