import React from "react";
import {render} from "react-dom";
import "./index.less";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { OpenAPI as SkjemaOpenApi } from './api/yrkesskade';
import { OpenAPI as KodeverkOpenApi } from './api/kodeverk';
import { Provider } from 'react-redux';
import store from './core/store';
// import reportWebVitals from "./reportWebVitals";

const API_BASE = '/api';
SkjemaOpenApi.BASE = API_BASE;
KodeverkOpenApi.BASE = '/kodeverk';

render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


