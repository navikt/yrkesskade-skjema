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
import SystemHeader from '../../components/SystemHeader';
import BackButton from '../../components/BackButton';
import TidsromSummary from '../../components/Summary/Tidsrom';
import SkadelidtSummary from '../../components/Summary/Skadelidt';
import UlykkeSummary from '../../components/Summary/Ulykke';
import SkadeSummary from '../../components/Summary/Skade';
import { useNavigate } from 'react-router-dom';
// import getTexts from '../../utils/getTexts.js';
import axios from 'axios';
// import { IGeneralForm } from '../../Interfaces/generalForm';
import StepIndicator from '../../components/StepIndicator';
import formUpdateAction from '../../State/formUpdateAction';

import { ISteps } from '../../Interfaces/steps';

import { useStateMachine } from 'little-state-machine';
interface IProps {
  // data?: IGeneralForm | undefined;
  steps: ISteps;
  increaseStep: () => void;
  decreaseStep: () => void;
}
const Summary = ({ steps, increaseStep, decreaseStep }: IProps) => {
  const { state } = useStateMachine({ formUpdateAction });
  console.log(state);
  const data = state;
  const navigate = useNavigate();
  const handleSending = async () => {
    try {
      await axios.post('/api/midlertidig/skademeldinger', { data });
      increaseStep();
      navigate('/yrkesskade/skjema/kvittering');
    } catch {
      navigate('/yrkesskade/skjema/feilmelding');
    }
  };
  const handleAbort = () => {
    window.location.href = 'https://nav.no';
  };
  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
        <BackButton decreaseStep={decreaseStep} url="/yrkesskade/skjema/skaden" />
          <Heading
            size="2xlarge"
            className="pageNumberTitle spacer"
            data-number="6"
          >
            Oppsumering
          </Heading>
          <Heading size="large" className="spacer">
            Undertittel
          </Heading>
          <BodyLong className="spacer">
            Les gjennom oppsummeringen før du sender inn innmeldingen. Hvis du
            trenger å gjøre endringer, kan du gjøre det/gå tilbake.
          </BodyLong>
          <Accordion className="spacer">
            <Accordion.Item>
              <Accordion.Header>Om deg</Accordion.Header>
              <Accordion.Content>Foreløpig tom</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>Tid og sted</Accordion.Header>
              <Accordion.Content>
                <TidsromSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>Om den skadelidte</Accordion.Header>
              <Accordion.Content>
                <SkadelidtSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>Om ulykken</Accordion.Header>
              <Accordion.Content>
                <UlykkeSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>Om skaden</Accordion.Header>
              <Accordion.Content>
                <SkadeSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
          <div className="buttonGroup">
              <Button variant="secondary" onClick={handleAbort}>
                Avbryt
              </Button>
              <Button onClick={handleSending}>Send inn</Button>
            </div>
        </Cell>
        <Cell xs={12} sm={12} lg={2}>
          <StepIndicator steps={steps} />
        </Cell>
        <Cell xs={12} lg={2}></Cell>
      </Grid>
    </ContentContainer>
  );
};
export default Summary;
