import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { KodeverdiDto, KodeverdiResponsDto } from "../../api/kodeverk";
import { KodeverkApiService } from "../../api/kodeverk/services/KodeverkApiService";
import { logErrorMessage } from "../../utils/logging";
import { RootState } from "../store";


interface KodeverkState {
  kodeverk: Record<
    string,
    Record<string, KodeverdiDto | undefined> | undefined
  >;
}

const initialState: KodeverkState = {
  kodeverk: {},
};

export const kodeverkSlice = createSlice({
  name: 'kodeverk',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(hentKodeverk.fulfilled, (state, action) => {
        state.kodeverk[action.payload.typenavn] =
          action.payload.kodeverdier.kodeverdierMap;
      })
      .addCase(hentKodeverk.rejected, (state, action) => {
        logErrorMessage(`Klarte ikke hente kodeverk. Årsak: ${JSON.stringify(action.error)}`);
      })
      .addCase(hentKodeverkForKategori.fulfilled, (state, action) => {
        state.kodeverk[action.payload.typenavn] =
          action.payload.kodeverdier.kodeverdierMap;
      })
      .addCase(hentKodeverkForKategori.rejected, (state, action) => {
        logErrorMessage(`Klarte ikke hente kodeverk. Årsak: ${JSON.stringify(action.error)}`);
      });
  },
});

export const hentKodeverk = createAsyncThunk(
  'kodeverk/hent',
  async (typenavn: string): Promise<KodeverkResponsPayload> => {
    const kodeverdier = await KodeverkApiService.hentKodeverdierForType(
      typenavn
    );

    return { typenavn: typenavn, kodeverdier: kodeverdier };
  }
);

export const hentKodeverkForKategori = createAsyncThunk(
  'kodeverk/kategori/hent',
  async (kodeverkRequest: KodeverkRequest): Promise<KodeverkResponsPayload> => {
    const kodeverdier = await KodeverkApiService.hentMapMedKodeverdierForTypeOgKategori(kodeverkRequest.typenavn, kodeverkRequest.kategorinavn);

    return {typenavn: kodeverkRequest.typenavn, kodeverdier: kodeverdier }
  }
)

export default kodeverkSlice.reducer;

interface KodeverkResponsPayload {
  typenavn: string;
  kodeverdier: KodeverdiResponsDto;
}

export interface KodeverkRequest {
  typenavn: string; kategorinavn: string;
}

export const selectAlleKodeverk = (state: RootState) => state.kodeverk;
export const selectKodeverk = createSelector(
  selectAlleKodeverk,
  (_: any, typenavn: string) => typenavn,
  (kodeverk, typenavn) => kodeverk.kodeverk[typenavn]
);

