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
    setError,
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
  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
          <div className="cellContentContainer">
            <Heading
              size="2xlarge"
              className="pageNumberTitle spacer"
              data-number="3"
            >
              Om den skadelidte
            </Heading>
            <InjuredForm errors={errors} register={register} setError={setError} control={control}/>
            <Button onClick={handleSubmit(onSubmit)}>Neste steg</Button>
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
