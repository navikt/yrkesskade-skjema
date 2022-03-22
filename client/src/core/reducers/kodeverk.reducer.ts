import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { merge } from "lodash";
import { KodeverdiDto } from "../../api/kodeverk";
import { RootState } from "../store";

interface KodeverkState {
  typer: {[key: string]: KodeverdiDto[]}
}

const initialState: KodeverkState = {
  typer: {}
}

export const kodeverkSlice = createSlice({
  name: 'kodeverk',
  initialState,
  reducers: {
    addKodeverk: (state, payload: PayloadAction<{[key: string]: KodeverdiDto[]}>) => {
      state.typer = merge(state.typer, payload.payload)
    }
  }
})

// selectors
const getType = (_: any, type: string) => type;

export const selectKodeverk = (state: RootState) => state.kodeverk
export const selectKodeverkType = createSelector(
  selectKodeverk,
  getType,
  (kodeverk, type) => {
    return kodeverk.typer[type]
  }
);

// default export
export default kodeverkSlice.reducer;
