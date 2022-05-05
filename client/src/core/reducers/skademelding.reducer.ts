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
      if (state.skademelding.skade?.skadedeDeler) {
        // vi skal ikke merge denne listen
        state.skademelding.skade.skadedeDeler = [];
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
    reset: (state) => {
      state = initialState;
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
  reset
} = skademeldingSlice.actions;
export default skademeldingSlice.reducer;
