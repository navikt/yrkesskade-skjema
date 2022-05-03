import './summary.less';
import {
  Heading,
  Button,
  ContentContainer,
  Grid,
  Cell,
  Accordion,
  BodyLong,
  Label,
} from '@navikt/ds-react';
import SystemHeader from '../../components/SystemHeader';
import BackButton from '../../components/BackButton';
import InnmelderSummary from '../../components/Summary/Innmelder';
import TidsromSummary from '../../components/Summary/Tidsrom';
import SkadelidtSummary from '../../components/Summary/Skadelidt';
import UlykkeSummary from '../../components/Summary/Ulykke';
import SkadeSummary from '../../components/Summary/Skade';
import BeskrivelseSummary from '../../components/Summary/Beskrivelse';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../../components/StepIndicator';
import ExitButton from '../../components/ExitButton';

import { useSelectedCompany } from '../../context/SelectedCompanyContext';
import { useEffect, useState } from 'react';

import { useErrorMessageContext } from '../../context/ErrorMessageContext';
import {
  Dekningsforhold,
  Skade,
  SkademeldingApiControllerService,
} from '../../api/yrkesskade';
import { logErrorMessage, logMessage } from '../../utils/logging';
import { logAmplitudeEvent } from '../../utils/analytics/amplitude';
import { useAppDispatch, useAppSelector } from '../../core/hooks/state.hooks';
import { oppdaterDekningsforhold, oppdaterSkade, reset, selectSkademelding } from '../../core/reducers/skademelding.reducer';

const Summary = () => {
  const { selectedCompany } = useSelectedCompany();
  const { setError } = useErrorMessageContext();
  const skademelding = useAppSelector((state) => selectSkademelding(state));
  const dispatch = useAppDispatch();

  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    // oppdater state med verdier som ikke har blitt satt av skjema
    if (skademelding.skadelidt && skademelding.skadelidt.dekningsforhold) {
      const dekningsforhold: Dekningsforhold = {
        organisasjonsnummer: selectedCompany.organisasjonsnummer as string,
        stillingstittelTilDenSkadelidte: skademelding.skadelidt.dekningsforhold.stillingstittelTilDenSkadelidte,
        rolletype: skademelding.skadelidt.dekningsforhold.rolletype
      };

      dekningsforhold.organisasjonsnummer = selectedCompany.organisasjonsnummer as string;
      dispatch(oppdaterDekningsforhold(dekningsforhold));
    }

    const skade: Skade = {
      alvorlighetsgrad: skademelding.skade?.alvorlighetsgrad,
      skadedeDeler: skademelding.skade?.skadedeDeler || [],
      antattSykefravaerTabellH: skademelding.skade?.antattSykefravaerTabellH || ''
    }
    dispatch(oppdaterSkade(skade));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany.organisasjonsnummer]);

  const data = skademelding;

  const navigate = useNavigate();
  const handleSending = async () => {
    setClicked(true);
    try {
      await SkademeldingApiControllerService.sendSkademelding(data);

      logMessage('Skademelding innsendt');
      logAmplitudeEvent('skademelding.innmelding', { status: 'fullfort' });
      navigate('/yrkesskade/skjema/kvittering');
      dispatch(reset());
    } catch (error: any) {
      setError('Det skjedde en feil med innsendingen. Vi jobber med å løse problemet. Prøv igjen senere.');
      logErrorMessage(`Innsending av skademelding feilet: ${error.message}`);
      logAmplitudeEvent('skademelding.innmelding', { status: 'feilet', feilmelding: error.message});
      navigate('/yrkesskade/skjema/feilmelding');
    }
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
            data-number="7"
          >
            Oppsummering
          </Heading>
          <BodyLong className="spacer">
            Les gjennom oppsummeringen før du sender inn og bekrefter opplysningene du har oppgitt.
            Hvis du trenger å gjøre endringer kan du gjøre det helt frem til du har fullført innsendingen.
          </BodyLong>
          <Label>Vi stoler på deg</Label>
          <BodyLong spacing>
            Dersom du med viten og vilje oppgir uriktige opplysninger,
            eller holder tilbake informasjon som kan ha betydning for utbetalinger fra NAV,
            kan dette medføre en politianmeldelse.
          </BodyLong>

          <Accordion className="spacer">
            <Accordion.Item renderContentWhenClosed={true} data-testid="oppsummering-accordian-innmelder">
              <Accordion.Header>Om deg</Accordion.Header>
              <Accordion.Content>
                <InnmelderSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item renderContentWhenClosed={true}>
              <Accordion.Header>Om den skadelidte</Accordion.Header>
              <Accordion.Content>
                <SkadelidtSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item renderContentWhenClosed={true}>
              <Accordion.Header>Tid og sted</Accordion.Header>
              <Accordion.Content>
                <TidsromSummary data={data} />
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
            <ExitButton />
            <Button
              onClick={handleSending}
              data-testid="send-injuryform"
              loading={clicked}
              disabled={clicked}>
                Send inn
            </Button>
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
