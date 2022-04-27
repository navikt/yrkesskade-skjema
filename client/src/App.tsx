import NotFound from './pages/404';
import Info from './pages/Info';
import Summary from './pages/Summary';
import Receipt from './pages/Receipt';
import Error from './pages/Error';
import TimeframeFormPage from './pages/Form/Timeframe';
import InjuryFormPage from './pages/Form/Injury';
import InjuredFormPage from './pages/Form/Injured';
import AccidentFormPage from './pages/Form/Accident';
import DescriptionFormPage from './pages/Form/Description';

import { Route, Routes, useLocation } from 'react-router-dom';
import { StateMachineProvider, createStore } from 'little-state-machine';

import { InnloggetProvider } from './context/InnloggetContext';
import { FeatureTogglesProvider } from './context/FeatureTogglesContext';
import { autentiseringsInterceptor } from './utils/autentisering';
import { SelectedCompanyProvider } from './context/SelectedCompanyContext';
import Landing from './pages/Landing';
import { ErrorMessageProvider } from './context/ErrorMessageContext';
import { formState } from './State/formState';
import { StateManagementProvider } from './context/StateManagementContext';
import { useEffect } from 'react';
import { logAmplitudeEvent } from './utils/analytics/amplitude';

const App = () => {
  createStore(formState, {});
  const location = useLocation();

  useEffect(() => {
    console.log(location);
    logAmplitudeEvent('skademelding.sidevisning', { pathname: location.pathname });
  }, [location])

  autentiseringsInterceptor();

  return (
    <ErrorMessageProvider>
      <InnloggetProvider>
        <FeatureTogglesProvider>
          <SelectedCompanyProvider>
            <StateMachineProvider>
              <StateManagementProvider>
                <Routes>
                  <Route path="yrkesskade/">
                    <Route index element={<Landing />} />
                    <Route path="skjema">
                      <Route index element={<Info />} />
                      <Route path="skadelidt" element={<InjuredFormPage />} />
                      <Route path="tidsrom" element={<TimeframeFormPage />} />
                      <Route path="ulykken" element={<AccidentFormPage />} />
                      <Route path="skaden" element={<InjuryFormPage />} />
                      <Route
                        path="beskrivelse"
                        element={<DescriptionFormPage />}
                      />
                      <Route path="oppsummering" element={<Summary />} />
                      <Route path="kvittering" element={<Receipt />} />
                      <Route path="feilmelding" element={<Error />} />
                    </Route>
                    <Route path="feilmelding" element={<Error />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </StateManagementProvider>
            </StateMachineProvider>
          </SelectedCompanyProvider>
        </FeatureTogglesProvider>
      </InnloggetProvider>
    </ErrorMessageProvider>
  );
};

export default App;
