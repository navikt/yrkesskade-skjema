import {
  Heading,
  ContentContainer,
  Grid,
  Cell,
  BodyLong,
} from '@navikt/ds-react';
import SystemHeader from '../../components/SystemHeader';
// import getTexts from '../../utils/getTexts';
// import { useNavigate } from 'react-router-dom';
import StepIndicator from '../../components/StepIndicator';

import { ISteps } from '../../Interfaces/steps';
interface IProps {
  steps: ISteps;
  // updateStep: (data: { step: number; higher: Boolean }) => void;
  // increaseStep: () => void;
}

const Receipt = ({ steps }: IProps) => {
  // const navigate = useNavigate();
  // const handleForward = () => {
  //   navigate('/yrkesskade/skjema/innmelder');
  // };
  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
          <div className="cellContentContainer">
            <div>
              <Heading
                size="2xlarge"
                className="pageNumberTitle spacer"
                data-number="8"
              >
                Kvittering
              </Heading>
              <Heading size="large" className="spacer">
                Takk for innmeldingen!
              </Heading>
              <BodyLong className="spacer">Info info info</BodyLong>
            </div>
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
export default Receipt;
