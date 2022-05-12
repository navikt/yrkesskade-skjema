import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../reducers/app.reducer';
import kodeverkReducer from '../reducers/kodeverk.reducer';
import skademeldingReducer from '../reducers/skademelding.reducer';

const store = configureStore({
  reducer: {
    app: appReducer,
    kodeverk: kodeverkReducer,
    skademelding: skademeldingReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
