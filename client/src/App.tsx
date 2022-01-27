import { useState } from 'react';
import Home from './pages/Home';
import NotFound from './pages/404';
import Info from './pages/Info';
import Summary from './pages/Summary';
import Receipt from './pages/Receipt';
import Error from './pages/Error';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { IGeneralForm } from './Interfaces/generalForm';
import { ISteps } from './Interfaces/steps';

import { InnloggetProvider } from './context/InnloggetContext';

const App = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState<IGeneralForm | undefined>(undefined);
  const [steps, setSteps] = useState<ISteps>({
    totalSteps: 8,
    currentStep: 1,
    details: [
      {
        text: 'Innledning',
        done: false,
        active: true,
      },
      {
        text: 'Om innmelder',
        done: false,
        active: false,
      },
      {
        text: 'Tid og sted',
        done: false,
        active: false,
      },
      {
        text: 'Om den skadelidte',
        done: false,
        active: false,
      },
      {
        text: 'Om ulykken',
        done: false,
        active: false,
      },
      {
        text: 'Om skaden',
        done: false,
        active: false,
      },
      {
        text: 'Oppsumering',
        done: false,
        active: false,
      },
      {
        text: 'Kvittering',
        done: false,
        active: false,
      },
    ],
  });

  const increaseStep = () => {
    let newSteps = { ...steps, currentStep: steps.currentStep + 1 };
    for (let i = 0; i < newSteps.currentStep -1; i++) {
      newSteps.details[i].done = true;
      newSteps.details[i].active = false;
    }
    newSteps.details[newSteps.currentStep - 1].active = true;
    if(newSteps.currentStep === 7) {
      navigate('/yrkesskade/skjema/oppsumering');
    }
    if(newSteps.currentStep === 8) {
      navigate('/yrkesskade/skjema/kvittering');
    }
    setSteps(newSteps);
  };
  const decreaseStep = () => {

    let newSteps = { ...steps, currentStep: steps.currentStep - 1 };
    for (let i = newSteps.details.length; i >= newSteps.currentStep; i--) {
      console.log(i-1)
      console.log(newSteps.details[i-1]);
      newSteps.details[i-1].done = false;
      newSteps.details[i-1].active = false;
    }
    newSteps.details[newSteps.currentStep - 1].active = true;
    console.log(newSteps);
    if(newSteps.currentStep === 1) {
      navigate('/yrkesskade');
    }
    if(newSteps.currentStep === 7) {
      navigate('/yrkesskade/skjema/oppsumering');
    }
    setSteps(newSteps);
  };

  return (
    <InnloggetProvider>
      <Routes>
        <Route path="yrkesskade/">
          {steps.currentStep === 1 && (
            <Route
              index
              element={<Info increaseStep={increaseStep} steps={steps} />}
              // element={<Info steps={steps} />}
            />
          )}
          <Route path="skjema">
            {steps.currentStep >= 2 && steps.currentStep <= 6 && (
              <Route
                index
                element={
                  <Home
                    passFormData={setFormdata}
                    steps={steps}
                    increaseStep={increaseStep}
                    decreaseStep={decreaseStep}
                  />
                }
              />
            )}
            {steps.currentStep === 7 && (
              <Route path="oppsumering" element={<Summary data={formdata} />} />
            )}
            {steps.currentStep === 8 && (
              <Route path="kvittering" element={<Receipt />} />
            )}
            <Route path="feilmelding" element={<Error />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </InnloggetProvider>
  );
};

export default App;
