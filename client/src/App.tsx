import { useState } from 'react';
import NotFound from './pages/404';
import Info from './pages/Info';
import Summary from './pages/Summary';
import Receipt from './pages/Receipt';
import Error from './pages/Error';
// import CompanyFormPage from './pages/Form/Company';
import TimeframeFormPage from './pages/Form/Timeframe';
import InjuryFormPage from './pages/Form/Injury';
import InjuredFormPage from './pages/Form/Injured';
import AccidentFormPage from './pages/Form/Accident';
import DescriptionFormPage from './pages/Form/Description';
import { Route, Routes } from 'react-router-dom';
import { ISteps } from './Interfaces/steps';
import { StateMachineProvider, createStore } from 'little-state-machine';

import { InnloggetProvider } from './context/InnloggetContext';
import { FeatureTogglesProvider } from './context/FeatureTogglesContext';
import { autentiseringsInterceptor } from './utils/autentisering';
import { SelectedCompanyProvider } from './context/SelectedCompanyContext';
import Landing from './pages/Landing';

const App = () => {
  createStore({}, { name: 'formdata'});
  const [steps, setSteps] = useState<ISteps>({
    totalSteps: 7,
    currentStep: 1,
    details: [
      {
        text: 'Innledning',
        done: false,
        active: true,
      },
      // {
      //   text: 'Om innmelder',
      //   done: false,
      //   active: false,
      // },
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
        text: 'Utfyllende beskrivelse',
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
      newSteps.details[i - 1].done = false;
      newSteps.details[i - 1].active = false;
    }
    newSteps.details[newSteps.currentStep - 1].active = true;
    setSteps(newSteps);
  };

  autentiseringsInterceptor();

  return (
    <InnloggetProvider>
      <FeatureTogglesProvider>
        <SelectedCompanyProvider>
        <StateMachineProvider>
          <Routes>
            <Route path="yrkesskade/">
              <Route
                index
                element={<Landing />}
              />
              <Route path="info"
                element={<Info increaseStep={increaseStep} steps={steps} />}
                // element={<Info steps={steps} />}
              />
              <Route path="skjema">
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
                  path="beskrivelse"
                  element={
                    <DescriptionFormPage
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
              <Route path="feilmelding" element={<Error />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          </StateMachineProvider>
        </SelectedCompanyProvider>
      </FeatureTogglesProvider>
    </InnloggetProvider>
  );
};

export default App;
