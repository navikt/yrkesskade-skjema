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
      aarsakUlykke: [],
      bakgrunnsaarsak: [],
      utfyllendeBeskrivelse: '',
      stedsbeskrivelse: '',
      paavirkningsform: [],
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
    fjernSkadetDel: (state, action: PayloadAction<SkadetDel>) => {
      state.skademelding.skade.skadedeDeler = state.skademelding.skade.skadedeDeler.filter(skadetDel => skadetDel.kroppsdel !== action.payload.kroppsdel && skadetDel.skadeart !== action.payload.skadeart)
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
  reset,
  fjernSkadetDel,
  fjernPeriode
} = skademeldingSlice.actions;
export default skademeldingSlice.reducer;
