import NotFound from './pages/404';
import Info from './pages/Info';
import Summary from './pages/Summary';
import Receipt from './pages/Receipt';
import Error from './pages/Error';
import TimeframeFormPage from './pages/Form/Timeframe';
import InjuryFormPage from './pages/Form/Injury';
import InjuredFormPage from './pages/Form/Injured';
import AccidentPlaceFormPage from './pages/Form/AccidentPlace';
import AccidentFormPage from './pages/Form/Accident';
import DescriptionFormPage from './pages/Form/Description';
import Landing from './pages/Landing';
import TemporaryDown from './pages/TemporaryDown';

import { Route, Routes, useLocation } from 'react-router-dom';

import { InnloggetProvider, useInnloggetContext } from './context/InnloggetContext';
import {
  FeatureTogglesProvider,
  useFeatureToggles,
} from './context/FeatureTogglesContext';
import { SelectedCompanyProvider } from './context/SelectedCompanyContext';
import { StateManagementProvider } from './context/StateManagementContext';
import { useEffect } from 'react';
import { logAmplitudeEvent } from './utils/analytics/amplitude';
import { useAppDispatch } from './core/hooks/state.hooks';
import {
  hentKodeverk,
  hentKodeverkForKategori,
} from './core/reducers/kodeverk.reducer';
import { useForm, FormProvider } from 'react-hook-form';
import { Skademelding } from './api/yrkesskade';
import { InnloggetStatus } from './utils/autentisering';

const App = () => {
  const location = useLocation();
  const methods = useForm<Skademelding>();

  useEffect(() => {
    logAmplitudeEvent('skademelding.sidevisning', {
      pathname: location.pathname,
    });
  }, [location]);

  return (
    <InnloggetProvider>
      <FeatureTogglesProvider>
        <FormProvider {...methods}>
          <SelectedCompanyProvider>
            <StateManagementProvider>
              <AppContent />
            </StateManagementProvider>
          </SelectedCompanyProvider>
        </FormProvider>
      </FeatureTogglesProvider>
    </InnloggetProvider>
  );
};

const AppContent = () => {
  const { toggles } = useFeatureToggles();
  const dispatch = useAppDispatch();
  const { innloggetStatus } = useInnloggetContext();

  useEffect(() => {
    if (innloggetStatus !== InnloggetStatus.INNLOGGET) {
      return;
    }

    dispatch(hentKodeverk('landkoderISO2'));
    dispatch(hentKodeverk('rolletype'));
    dispatch(hentKodeverk('sykdomstype'));
    dispatch(hentKodeverk('paavirkningsform'));

    // preload av stillingstitler
    dispatch(
      hentKodeverkForKategori({
        typenavn: 'stillingstittel',
        kategorinavn: 'arbeidstaker',
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innloggetStatus]);

  return (
    <Routes>
      <Route path="yrkesskade/">
        {toggles && !toggles.SKADEMELDING_TILGJENGELIG ? (
          <>
            <Route index element={<TemporaryDown />} />
            <Route path="*" element={<TemporaryDown />} />
          </>
        ) : (
          <>
            <Route index element={<Landing />} />
            <Route path="skjema">
              <Route index element={<Info />} />
              <Route path="skadelidt" element={<InjuredFormPage />} />
              <Route path="tidsrom" element={<TimeframeFormPage />} />
              <Route path="ulykkessted" element={<AccidentPlaceFormPage />} />
              <Route path="ulykken" element={<AccidentFormPage />} />
              <Route path="skaden" element={<InjuryFormPage />} />
              <Route path="beskrivelse" element={<DescriptionFormPage />} />
              <Route path="oppsummering" element={<Summary />} />
              <Route path="kvittering" element={<Receipt />} />
              <Route path="feilmelding" element={<Error />} />
            </Route>
          </>
        )}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
