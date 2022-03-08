// import { useState } from 'react';
import './summary.less';
import {
  Heading,
  Button,
  ContentContainer,
  Grid,
  Cell,
  Accordion,
  BodyLong,
} from '@navikt/ds-react';
import { Print } from '@navikt/ds-icons';

import SystemHeader from '../../components/SystemHeader';
import BackButton from '../../components/BackButton';
import InnmelderSummary from '../../components/Summary/Innmelder';
import TidsromSummary from '../../components/Summary/Tidsrom';
import SkadelidtSummary from '../../components/Summary/Skadelidt';
import UlykkeSummary from '../../components/Summary/Ulykke';
import SkadeSummary from '../../components/Summary/Skade';
import BeskrivelseSummary from '../../components/Summary/Beskrivelse';
import { useNavigate } from 'react-router-dom';
// import getTexts from '../../utils/getTexts.js';
// import { IGeneralForm } from '../../Interfaces/generalForm';
import StepIndicator from '../../components/StepIndicator';
// import formUpdateAction from '../../State/formUpdateAction';

// import { ISteps } from '../../Interfaces/steps';

import { useStateMachine } from 'little-state-machine';
import { useSelectedCompany } from '../../context/SelectedCompanyContext';
import { useEffect } from 'react';
import {
  oppdaterDekningsforholdOrganisasjon,
  oppdaterSkade,
} from '../../State/actions/skademeldingStateAction';
import { useErrorMessageContext } from '../../context/ErrorMessageContext';
import {
  Skademelding,
  SkademeldingApiControllerService,
} from '../../api/yrkesskade';
import clearFormAction from '../../State/actions/clearAction';

const Summary = () => {
  const { state, actions } = useStateMachine({
    oppdaterDekningsforholdOrganisasjon,
    oppdaterSkade,
    clearFormAction
  });
  const { selectedCompany } = useSelectedCompany();
  const { setError } = useErrorMessageContext();

  useEffect(() => {
    // oppdater state med verdier som ikke har blitt satt av skjema
    actions.oppdaterDekningsforholdOrganisasjon({
      organisasjonsnummer: selectedCompany.organisasjonsnummer as string,
      navn: selectedCompany.navn,
    });
    actions.oppdaterSkade({
      alvorlighetsgrad: state.skade.alvorlighetsgrad,
      skadedeDeler: state.skade.skadedeDeler,
      antattSykefravaerTabellH: state.skade.antattSykefravaerTabellH,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany.organisasjonsnummer]);

  const handlePrintClicked = () => {
    window.print()
  }

  const data = state;
  // const data = {
  //   innmelder: {
  //     norskIdentitetsnummer: 20089408750,
  //     paaVegneAv: 'paaVegneAv',
  //     innmelderrolle: 'innmelderrolle',
  //     altinnrolleIDer: ['altinnrolleIDer', 'altinnrolleIDer'],
  //   },
  //   skadelidt: {
  //     norskIdentitetsnummer: 'norskIdentitetsnummer',
  //     dekningsforhold: {
  //       organisasjonsnummer: 'organisasjonsnummer',
  //       navnPaaVirksomheten: 'navnPaaVirksomheten',
  //       stillingstittelTilDenSkadelidte: 'stillingstittelTilDenSkadelidte',
  //       rolletype: 'rolletype',
  //     },
  //   },
  //   skade: {
  //     alvorlighetsgrad: 'alvorlighetsgrad',
  //     skadedeDeler: [
  //       {
  //         kroppsdelTabellD: 'kroppsdelTabellD',
  //         skadeartTabellC: 'skadeartTabellC',
  //       },
  //       {
  //         kroppsdelTabellD: 'kroppsdelTabellD',
  //         skadeartTabellC: 'skadeartTabellC',
  //       },
  //       {
  //         kroppsdelTabellD: 'kroppsdelTabellD',
  //         skadeartTabellC: 'skadeartTabellC',
  //       },
  //     ],
  //     antattSykefravaerTabellH: 'antattSykefravaerTabellH',
  //   },
  //   hendelsesfakta: {
  //     tid: {
  //       tidspunkt: new Date(),
  //       periode: {
  //         fra: new Date(),
  //         til: new Date(),
  //       },
  //       ukjent: false,
  //       tidstype: 'periode',
  //     },
  //     naarSkjeddeUlykken: 'naarSkjeddeUlykken',
  //     hvorSkjeddeUlykken: 'hvorSkjeddeUlykken',
  //     ulykkessted: {
  //       sammeSomVirksomhetensAdresse: false,
  //       adresse: {
  //         adresselinje1: 'adresselinje1',
  //         adresselinje2: 'adresselinje2',
  //         adresselinje3: 'adresselinje3',
  //         land: 'land',
  //       },
  //     },
  //     aarsakUlykkeTabellAogE: ['årsak1', 'årsak2', 'årsak3'],
  //     bakgrunnsaarsakTabellBogG: ['bakgrunn1', 'bakgrunn2', 'bakgrunn3'],
  //     utfyllendeBeskrivelse: 'utfyllende bla bla bla',
  //     stedsbeskrivelseTabellF: 'Stedsgreie streng lalala',
  //   },
  // };
  const navigate = useNavigate();
  const handleSending = async () => {
    try {
      console.log('send skademelding: ', data);
      await SkademeldingApiControllerService.sendSkademelding(
        data as unknown as Skademelding
      );
      actions.clearFormAction({});
      navigate('/yrkesskade/skjema/kvittering');
    } catch (error: any) {
      setError(error.body);
      navigate('/yrkesskade/skjema/feilmelding');
    }
  };
  const handleAbort = () => {
    actions.clearFormAction({});
    window.location.href = 'https://nav.no';
  };
  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
          <BackButton url="/yrkesskade/skjema/beskrivelse" />
          <Heading
            size="2xlarge"
            className="pageNumberTitle spacer"
            data-number="6"
          >
            Oppsumering
          </Heading>
          <BodyLong className="spacer">
            Les gjennom oppsummeringen før du sender inn og bekrefter
            opplysningene du har oppgitt. Hvis du trenger å gjøre endringer kan
            du gjøre det helt frem til du har fullført innsendingen. Dersom du
            med viten og vilje oppgir uriktige opplysninger, eller holder
            tilbake informasjon som kan ha betydning for utbetalinger fra NAV,
            kan dette medføre en politianmeldelse. Ønsker du kopi av
            skademeldingen kan du skrive den ut her.
          </BodyLong>
          <Button className="no-print" onClick={handlePrintClicked} variant="tertiary">
            <Print />
            Skriv ut en kopi av skademeldingen
          </Button>
          <Accordion className="spacer">
            <Accordion.Item renderContentWhenClosed={true}>
              <Accordion.Header>Om deg</Accordion.Header>
              <Accordion.Content>
                <InnmelderSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item renderContentWhenClosed={true}>
              <Accordion.Header>Tid og sted</Accordion.Header>
              <Accordion.Content>
                <TidsromSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item renderContentWhenClosed={true}>
              <Accordion.Header>Om den skadelidte</Accordion.Header>
              <Accordion.Content>
                <SkadelidtSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item renderContentWhenClosed={true}>
              <Accordion.Header>Om ulykken</Accordion.Header>
              <Accordion.Content>
                <UlykkeSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item renderContentWhenClosed={true}>
              <Accordion.Header>Om skaden</Accordion.Header>
              <Accordion.Content>
                <SkadeSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item renderContentWhenClosed={true}>
              <Accordion.Header>Utfyllende beskrivelse</Accordion.Header>
              <Accordion.Content>
                <BeskrivelseSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
          <div className="buttonGroup no-print">
            <Button variant="secondary" onClick={handleAbort}>
              Avbryt
            </Button>
            <Button onClick={handleSending}>Send inn</Button>
          </div>
        </Cell>
        <Cell xs={12} sm={12} lg={2}>
          <StepIndicator />
        </Cell>
        <Cell xs={12} lg={2}></Cell>
      </Grid>
    </ContentContainer>
  );
};
export default Summary;
