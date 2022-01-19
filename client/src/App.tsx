import { useState } from 'react';
import Home from './pages/Home';
import NotFound from './pages/404';
import Info from './pages/Info';
import Summary from './pages/Summary';
import Receipt from './pages/Receipt';
import Error from './pages/Error';
import { Route, Routes } from 'react-router-dom';
import { IGeneralForm } from './Interfaces/generalForm';
import {ISteps} from './Interfaces/steps';

import { InnloggetProvider } from './context/InnloggetContext';

const App = () => {
  const [formdata, setFormdata] = useState<IGeneralForm | undefined>(undefined);
  const [steps, setSteps] = useState<ISteps>([
    {
      step: 1,
      text: 'Innledning',
      done: true,
      active: false,
    },
    {
      step: 2,
      text: 'Om innmelder',
      done: false,
      active: true,
    },
    {
      step: 3,
      text: 'Tid og sted',
      done: false,
      active: false,
    },
    {
      step: 4,
      text: 'Tid og sted',
      done: false,
      active: false,
    },
    {
      step: 5,
      text: 'Tid og sted',
      done: false,
      active: false,
    },
    {
      step: 6,
      text: 'Tid og sted',
      done: false,
      active: false,
    },
  ]);

  return (
    <InnloggetProvider>
      <Routes>
        <Route path="yrkesskade/">
          <Route index element={<Info steps={steps} />} />
          <Route path="skjema">
            <Route index element={<Home passFormData={setFormdata} />} />
            <Route path="oppsumering" element={<Summary data={formdata} />} />
            <Route path="kvittering" element={<Receipt />} />
            <Route path="feilmelding" element={<Error />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </InnloggetProvider>
  );
};

export default App;
