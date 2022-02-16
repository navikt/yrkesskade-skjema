import DescriptionForm from '../../../components/Forms/Description';
import {
  ContentContainer,
  Grid,
  Cell,
  Button,
  Heading,
} from '@navikt/ds-react';
import SystemHeader from '../../../components/SystemHeader';
import BackButton from '../../../components/BackButton';

import StepIndicator from '../../../components/StepIndicator';
import { ISteps } from '../../../Interfaces/steps';

import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import formUpdateAction from '../../../State/formUpdateAction';
import { useNavigate } from 'react-router-dom';

interface IProps {
  steps: ISteps;
  decreaseStep: () => void;
  increaseStep: () => void;
}

const DescriptionFormPage = ({ steps, decreaseStep, increaseStep }: IProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { actions } = useStateMachine({ formUpdateAction });

  const onSubmit = (data: any) => {
    actions.formUpdateAction(data);
    increaseStep();
    navigate('/yrkesskade/skjema/oppsumering');
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
          <div className="cellContentContainer">
            <BackButton decreaseStep={decreaseStep} url="/yrkesskade/skjema/skaden" />
            <Heading
              size="2xlarge"
              className="pageNumberTitle spacer"
              data-number="6"
            >
              Utfyllende beskrivelse
            </Heading>
            <DescriptionForm errors={errors} register={register} />
            <div className="buttonGroup">
              <Button variant="secondary" onClick={handleAbort}>
                Avbryt
              </Button>
              <Button onClick={handleSubmit(onSubmit)}>Neste steg</Button>
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
export default DescriptionFormPage;
