/* tslint:disable no-console */
/* eslint-disable no-console */

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

import { useState } from 'react';

import {
  SkademeldingApiControllerService,
} from '../../api/yrkesskade';
import { logErrorMessage, logMessage, logWarningMessage } from '../../utils/logging';
import { logAmplitudeEvent } from '../../utils/analytics/amplitude';
import { useAppDispatch, useAppSelector } from '../../core/hooks/state.hooks';
import { reset, selectSkademelding } from '../../core/reducers/skademelding.reducer';
import { useCheckIfReloaded } from '../../core/hooks/reloadCheck.hooks';
import axios, { AxiosError } from 'axios';

const Summary = () => {
  useCheckIfReloaded();
  const skademelding = useAppSelector((state) => selectSkademelding(state));
  const dispatch = useAppDispatch();

  const [clicked, setClicked] = useState<boolean>(false);

  const data = skademelding;

  const navigate = useNavigate();
  const handleSending = async () => {
    setClicked(true);
    try {
      await SkademeldingApiControllerService.sendSkademelding(data);

      logMessage('Skademelding innsendt');
      logAmplitudeEvent('skademelding.innmelding', { status: 'fullfort' });
      navigate('/yrkesskade/skjema/kvittering',  { state: data });
      dispatch(reset());
    } catch (error: any) {

      console.log('er axios feil: ', axios.isAxiosError(error));
      console.log('error som json: ', JSON.stringify(error));

      const melding = `Innsending ikke fullført. Brukeren sin autorisasjon er utgått og blir sendt tilbake til pålogging`;
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          logWarningMessage(melding);
          // ikke utfør resten av koden
          return;
        }
      } else if (error.status === 401) {
        logWarningMessage(melding);
        return;
      } else {
        logErrorMessage(`Innsending av skademelding feilet: ${error.message}`);
        logAmplitudeEvent('skademelding.innmelding', { status: 'feilet', feilmelding: error.message});
        navigate('/yrkesskade/skjema/feilmelding', { state: 'Det skjedde en feil med innsendingen. Vi jobber med å løse problemet. Prøv igjen senere.'});
      }
    }
  };

  const isPeriod = skademelding?.hendelsesfakta?.tid?.tidstype === 'Periode';

  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
          <BackButton url="/yrkesskade/skjema/beskrivelse" />
          <Heading
            size="xlarge"
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
            <Accordion.Item renderContentWhenClosed={true} data-testid="oppsummering-accordian-tid-og-sted">
              <Accordion.Header>Tid og sted</Accordion.Header>
              <Accordion.Content>
                <TidsromSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item renderContentWhenClosed={true} data-testid="oppsummering-hendelsen">
              <Accordion.Header>{isPeriod ? 'Om den skadelige påvirkningen' : 'Ulykkessted og om ulykken'}</Accordion.Header>
              <Accordion.Content>
                <UlykkeSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item renderContentWhenClosed={true} data-testid="oppsummering-accordian-skade">
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
