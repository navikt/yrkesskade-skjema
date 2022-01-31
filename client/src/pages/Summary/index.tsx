import './summary.less';
import {
  Heading,
  Button,
  ContentContainer,
  Grid,
  Cell,
  Accordion,
  BodyLong
} from '@navikt/ds-react';
import SystemHeader from '../../components/SystemHeader';
// import HendelsesfaktaSummary from '../../components/Summary/Hendelsesfakta';
// import InnmelderSummary from '../../components/Summary/Innmelder';
// import SkadelidtSummary from '../../components/Summary/Skadelidt';
// import SkadeSummary from '../../components/Summary/Skade';
import { useNavigate } from 'react-router-dom';
// import getTexts from '../../utils/getTexts.js';
import axios from 'axios';
import { IGeneralForm } from '../../Interfaces/generalForm';
import StepIndicator from '../../components/StepIndicator';

import { ISteps } from '../../Interfaces/steps';
interface IProps {
  data?: IGeneralForm | undefined;
  steps: ISteps;
  increaseStep: () => void;
  decreaseStep: () => void;
}
const Summary = ({ data, steps, increaseStep, decreaseStep }: IProps) => {
  const navigate = useNavigate();
  const handleSending = async () => {
    try {
      await axios.post('/api/skademelding', { ...data });
      increaseStep();
    } catch {
      navigate('/yrkesskade/skjema/feilmelding');
    }
  };
  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
        <Heading
                size="2xlarge"
                className="pageNumberTitle spacer"
                data-number="7"
              >
                Oppsumering
              </Heading>
              <Heading
                size="large"
                className="spacer"
              >
                Undertittel
              </Heading>
              <BodyLong className="spacer">
              Les gjennom oppsummeringen før du sender inn innmeldingen. Hvis du trenger å gjøre endringer, kan du gjøre det/gå tilbake.
              </BodyLong>
          <Accordion className="spacer">
          <Accordion.Item>
              <Accordion.Header>Om deg</Accordion.Header>
              <Accordion.Content>
                Foreløpig tom
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>Tid og sted</Accordion.Header>
              <Accordion.Content>
                {/* <InnmelderSummary innmelder={data?.innmelder} /> */}
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>Om den skadelidte</Accordion.Header>
              <Accordion.Content>
                {/* <InnmelderSummary innmelder={data?.innmelder} /> */}
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>Om ulykken</Accordion.Header>
              <Accordion.Content>
                {/* <InnmelderSummary innmelder={data?.innmelder} /> */}
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>Om skaden</Accordion.Header>
              <Accordion.Content>
                {/* <InnmelderSummary innmelder={data?.innmelder} /> */}
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
          <Button onClick={handleSending}>Send inn</Button>
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
