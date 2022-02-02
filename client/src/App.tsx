import { useState } from 'react';
import NotFound from './pages/404';
import Info from './pages/Info';
import Summary from './pages/Summary';
import Receipt from './pages/Receipt';
import Error from './pages/Error';
import CompanyFormPage from './pages/Form/Company';
import TimeframeFormPage from './pages/Form/Timeframe';
import InjuryFormPage from './pages/Form/Injury';
import InjuredFormPage from './pages/Form/Injured';
import AccidentFormPage from './pages/Form/Accident';
import { Route, Routes } from 'react-router-dom';
import { ISteps } from './Interfaces/steps';
import { StateMachineProvider, createStore } from 'little-state-machine';

import { InnloggetProvider } from './context/InnloggetContext';
import { FeatureTogglesProvider } from './context/FeatureTogglesContext';

const App = () => {
  createStore({}, { name: 'formdata'});
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
    for (let i = 0; i < newSteps.currentStep - 1; i++) {
      newSteps.details[i].done = true;
      newSteps.details[i].active = false;
    }
    newSteps.details[newSteps.currentStep - 1].active = true;
    setSteps(newSteps);
  };
  const decreaseStep = () => {
    let newSteps = { ...steps, currentStep: steps.currentStep - 1 };
    for (let i = newSteps.details.length; i >= newSteps.currentStep; i--) {
      console.log(i - 1);
      console.log(newSteps.details[i - 1]);
      newSteps.details[i - 1].done = false;
      newSteps.details[i - 1].active = false;
    }
    newSteps.details[newSteps.currentStep - 1].active = true;
    setSteps(newSteps);
  };

  return (
    <InnloggetProvider>
      <FeatureTogglesProvider>
        <StateMachineProvider>
          <Routes>
            <Route path="yrkesskade/">
              <Route
                index
                element={<Info increaseStep={increaseStep} steps={steps} />}
                // element={<Info steps={steps} />}
              />
              <Route path="skjema">
                <Route
                  path="innmelder"
                  element={
                    <CompanyFormPage
                      steps={steps}
                      increaseStep={increaseStep}
                      decreaseStep={decreaseStep}
                    />
                  }
                />
                <Route
                  path="tidsrom"
                  element={
                    <TimeframeFormPage
                      steps={steps}
                      increaseStep={increaseStep}
                      decreaseStep={decreaseStep}
                    />
                  }
                />
                <Route
                  path="skadelidt"
                  element={
                    <InjuredFormPage
                      steps={steps}
                      increaseStep={increaseStep}
                      decreaseStep={decreaseStep}
                    />
                  }
                />
                <Route
                  path="ulykken"
                  element={
                    <AccidentFormPage
                      steps={steps}
                      increaseStep={increaseStep}
                      decreaseStep={decreaseStep}
                    />
                  }
                />
                <Route
                  path="skaden"
                  element={
                    <InjuryFormPage
                      steps={steps}
                      increaseStep={increaseStep}
                      decreaseStep={decreaseStep}
                    />
                  }
                />
                <Route
                  path="oppsumering"
                  element={
                    <Summary
                      steps={steps}
                      increaseStep={increaseStep}
                      decreaseStep={decreaseStep}
                    />
                  }
                />
                <Route path="kvittering" element={<Receipt steps={steps}/>} />
                <Route path="feilmelding" element={<Error />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </StateMachineProvider>
      </FeatureTogglesProvider>
    </InnloggetProvider>
  );
};

export default App;
