import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from '../reducers/app.reducer';
import kodeverkReducer from '../reducers/kodeverk.reducer';
import skademeldingReducer from '../reducers/skademelding.reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const rootReducers = combineReducers({
  app: appReducer,
  kodeverk: kodeverkReducer,
  skademelding: skademeldingReducer,
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
