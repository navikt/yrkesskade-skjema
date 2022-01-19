import {
  Heading,
  ContentContainer,
  Grid,
  Cell,
  Button,
} from '@navikt/ds-react';
import SystemHeader from '../../components/SystemHeader';
// import getTexts from '../../utils/getTexts';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../../components/StepIndicator';

import {ISteps} from '../../Interfaces/steps';
interface IProps {
  steps: ISteps;
}

const Info = ({ steps }: IProps) => {
  const navigate = useNavigate();
  const handleForward = () => {
    navigate('/yrkesskade/skjema');
  };
  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={6}>
          <Heading size="2xlarge">1. Innledning</Heading>
          <div className="buttonSection">
            <Button
              variant="primary"
              onClick={handleForward}
              data-testid="start-innmelding"
            >
              Start innmelding
            </Button>
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
export default Info;
