import { configureStore } from '@reduxjs/toolkit';
import kodeverkReducer from '../reducers/kodeverk.reducer';
import skademeldingReducer from '../reducers/skademelding.reducer';

const store = configureStore({
  reducer: {
    kodeverk: kodeverkReducer,
    skademelding: skademeldingReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
