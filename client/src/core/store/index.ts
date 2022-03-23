import { configureStore } from '@reduxjs/toolkit';
import kodeverkReducer from '../reducers/kodeverk.reducer';

const store = configureStore({
  reducer: {
    kodeverk: kodeverkReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
