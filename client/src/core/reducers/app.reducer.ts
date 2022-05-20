import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Organisasjon } from "../../types/brukerinfo"
import { RootState } from "../store"

interface AppState {
  enhet: Organisasjon | null
}

const initialState: AppState = {
  enhet: null
}

export const appSlice = createSlice({
  name: 'applikasjon',
  initialState,
  reducers: {
    addOrganisasjon: (state, action: PayloadAction<Organisasjon>) => {
      state.enhet = action.payload
    }
  }
})

// selectors
export const selectOrganisasjon = (state: RootState) => state.app.enhet;

// exports
export const { addOrganisasjon} = appSlice.actions;
export default appSlice.reducer
