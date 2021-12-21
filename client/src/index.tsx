import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
// import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import Summary from "./pages/Summary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="skjema/">
          <Route index element={<Home />} />
          <Route path="oppsumering" element={<Summary />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
