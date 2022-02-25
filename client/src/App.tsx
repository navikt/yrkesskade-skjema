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

import { Route, Routes } from 'react-router-dom';
import { StateMachineProvider, createStore } from 'little-state-machine';

import { InnloggetProvider } from './context/InnloggetContext';
import { FeatureTogglesProvider } from './context/FeatureTogglesContext';
import { autentiseringsInterceptor } from './utils/autentisering';
import { SelectedCompanyProvider } from './context/SelectedCompanyContext';
import Landing from './pages/Landing';

const App = () => {
  createStore(
    {
      innmelder: {
        norskIdentitetsnummer: undefined,
        paaVegneAv: '',
        innmelderrolle: '',
        altinnrolleIDer: [],
      },
      skadelidt: {
        norskIdentitetsnummer: '',
        dekningsforhold: {
          organisasjonsnummer: '',
          navnPaaVirksomheten: '',
          stillingstittelTilDenSkadelidte: '',
          rolletype: '',
        },
      },
      skade: {
        alvorlighetsgrad: '',
        skadedeDeler: [],
        antattSykefravaerTabellH: '',
      },
      hendelsesfakta: {
        tid: {
          tidspunkt: null,
          periode: {
            fra: null,
            til: null,
          },
          ukjent: false,
          tidstype: 'Tidspunkt',
        },
        naarSkjeddeUlykken: '',
        hvorSkjeddeUlykken: '',
        ulykkessted: {
          sammeSomVirksomhetensAdresse: undefined,
          adresse: {
            adresselinje1: undefined,
            adresselinje2: undefined,
            adresselinje3: undefined,
            land: undefined,
          },
        },
        aarsakUlykkeTabellAogE: [],
        bakgrunnsaarsakTabellBogG: [],
        utfyllendeBeskrivelse: '',
        stedsbeskrivelseTabellF: '',
      },
    },
    {}
  );

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
              <Route path="skjema">
                <Route
                  index
                  element={<Info />}
                />
                  <Route path="tidsrom" element={<TimeframeFormPage />} />
                  <Route path="skadelidt" element={<InjuredFormPage />} />
                  <Route path="ulykken" element={<AccidentFormPage />} />
                  <Route path="skaden" element={<InjuryFormPage />} />
                  <Route path="beskrivelse" element={<DescriptionFormPage />} />
                  <Route path="oppsumering" element={<Summary />} />
                  <Route path="kvittering" element={<Receipt />} />
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
