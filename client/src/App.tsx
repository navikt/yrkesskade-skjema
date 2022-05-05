import NotFound from './pages/404';

import { Route, Routes, useLocation } from 'react-router-dom';

import { InnloggetProvider } from './context/InnloggetContext';
import { FeatureTogglesProvider } from './context/FeatureTogglesContext';
import { autentiseringsInterceptor } from './utils/autentisering';
import { SelectedCompanyProvider } from './context/SelectedCompanyContext';
import { ErrorMessageProvider } from './context/ErrorMessageContext';
import { StateManagementProvider } from './context/StateManagementContext';
import { useEffect } from 'react';
import { logAmplitudeEvent } from './utils/analytics/amplitude';
import { useAppDispatch } from './core/hooks/state.hooks';
import {
  hentKodeverk,
  hentKodeverkForKategori,
} from './core/reducers/kodeverk.reducer';
import AccidentFormPage from './pages/Form/Accident';
import DescriptionFormPage from './pages/Form/Description';
import InjuredFormPage from './pages/Form/Injured';
import InjuryFormPage from './pages/Form/Injury';
import TimeframeFormPage from './pages/Form/Timeframe';
import Info from './pages/Info';
import Landing from './pages/Landing';
import Summary from './pages/Summary';
import Error from './pages/Error';
import Receipt from './pages/Receipt';
import { useForm, FormProvider } from 'react-hook-form';
import { Skademelding } from './api/yrkesskade';

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const methods = useForm<Skademelding>();

  useEffect(() => {
    logAmplitudeEvent('skademelding.sidevisning', {
      pathname: location.pathname,
    });
  }, [location]);

  useEffect(() => {
    dispatch(hentKodeverk('landkoderISO2'));
    dispatch(hentKodeverk('rolletype'));

    // preload av stillingstitler
    dispatch(
      hentKodeverkForKategori({
        typenavn: 'stillingstittel',
        kategorinavn: 'arbeidstaker',
      })
    );
  });

  autentiseringsInterceptor();

  return (
    <ErrorMessageProvider>
      <InnloggetProvider>
        <FeatureTogglesProvider>
          <FormProvider {...methods}>
            <SelectedCompanyProvider>
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
            </SelectedCompanyProvider>
          </FormProvider>
        </FeatureTogglesProvider>
      </InnloggetProvider>
    </ErrorMessageProvider>
  );
};

export default App;
