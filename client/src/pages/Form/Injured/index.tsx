import React from 'react';
import InjuredForm from '../../../components/Forms/Injured';
import {
  ContentContainer,
  Grid,
  Cell,
  Button,
  Heading,
  // Link
} from '@navikt/ds-react';
import SystemHeader from '../../../components/SystemHeader';
import BackButton from '../../../components/BackButton';

// import { IGeneralForm } from '../../Interfaces/generalForm';

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

const InjuredFormPage = ({ steps, decreaseStep, increaseStep }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm();

  const navigate = useNavigate();

  const { actions } = useStateMachine({ formUpdateAction });

  const onSubmit = (data: any) => {
    actions.formUpdateAction(data);
    increaseStep();
    navigate('/yrkesskade/skjema/Ulykken');
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
          <BackButton decreaseStep={decreaseStep} url="/yrkesskade/skjema/tidsrom" />
            <Heading
              size="2xlarge"
              className="pageNumberTitle spacer"
              data-number="3"
            >
              Om den skadelidte
            </Heading>
            <InjuredForm errors={errors} register={register} control={control}/>
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
export default InjuredFormPage;
