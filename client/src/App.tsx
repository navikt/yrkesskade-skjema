import { useState } from 'react';
import Home from "./pages/Home";
import NotFound from "./pages/404";
import Info from "./pages/Info";
import Summary from "./pages/Summary";
import Receipt from "./pages/Receipt";
import Error from "./pages/Receipt";
import { Route, Routes } from "react-router-dom";

interface ISimpleForm {
  fornavn: string | undefined;
  etternavn: string | undefined;
  fødselsnummer: number | undefined;
}

const App = () => {
  const [formdata, setFormdata] = useState<ISimpleForm | undefined>(undefined);
  return (
    <Routes>
      <Route path="yrkesskade/">
      <Route index element={<Info />} />
        <Route path="skjema">
          <Route index element={<Home passFormData={setFormdata} />} />
          <Route path="oppsumering" element={<Summary data={formdata}/>} />
          <Route path="kvittering" element={<Receipt />} />
          <Route path="feilmelding" element={<Error />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
