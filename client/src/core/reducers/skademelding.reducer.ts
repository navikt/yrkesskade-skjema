import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { merge } from "lodash";
import { Dekningsforhold, Innmelder, Skade, Skadelidt, Skademelding, SkadetDel, Tid } from "../../api/yrkesskade";
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
      antattSykefravaerTabellH: '',
    },
    hendelsesfakta: {
      tid: {
        tidspunkt: undefined,
        periode: {
          fra: undefined,
          til: undefined,
        },
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
      aarsakUlykkeTabellAogE: [],
      bakgrunnsaarsakTabellBogG: [],
      utfyllendeBeskrivelse: '',
      stedsbeskrivelseTabellF: '',
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
      state.skademelding.skade.skadedeDeler = state.skademelding.skade.skadedeDeler.filter(skadetDel => skadetDel.kroppsdelTabellD !== action.payload.kroppsdelTabellD && skadetDel.skadeartTabellC !== action.payload.skadeartTabellC)
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
  fjernSkadetDel
} = skademeldingSlice.actions;
export default skademeldingSlice.reducer;
