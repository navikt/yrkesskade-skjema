import React from "react";
import {render} from "react-dom";
import "./index.less";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { OpenAPI as SkjemaOpenApi } from './api/yrkesskade';
import { OpenAPI as KodeverkOpenApi } from './api/kodeverk';
import { Provider } from 'react-redux';
import store from './core/store';
import { initAmplitude } from "./utils/analytics/amplitude";
import { autentiseringsInterceptor } from "./utils/autentisering";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const API_BASE = '/backend/api';
SkjemaOpenApi.BASE = API_BASE;
KodeverkOpenApi.BASE = '/kodeverk';
autentiseringsInterceptor();

initAmplitude();

const persistor = persistStore(store);

render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


