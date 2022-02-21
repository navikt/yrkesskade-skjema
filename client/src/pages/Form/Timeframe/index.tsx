import React from 'react';
import TimeframeForm from '../../../components/Forms/Timeframe';
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

const TimeframeFormPage = ({ steps, decreaseStep, increaseStep }: IProps) => {
  const { actions, state } = useStateMachine({ formUpdateAction });
  console.log(state);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm({
    defaultValues: {
      'hendelsesfakta.tid.tidstype': state.hendelsesfakta.tid.tidstype,
      'hendelsesfakta.tid.tidspunkt': state.hendelsesfakta.tid.tidspunkt,
      'hendelsesfakta.tid.periode.fra': state.hendelsesfakta.tid.periode.fra,
      'hendelsesfakta.tid.periode.til': state.hendelsesfakta.tid.periode.til,
      'hendelsesfakta.naarSkjeddeUlykken': state.hendelsesfakta.naarSkjeddeUlykken
    }
  });

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    actions.formUpdateAction(data);
    increaseStep();
    navigate('/yrkesskade/skjema/skadelidt');
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
            <BackButton decreaseStep={decreaseStep} url="/yrkesskade/" />
            <Heading
              size="2xlarge"
              className="pageNumberTitle spacer"
              data-number="2"
            >
              Tid og dato
            </Heading>
            <TimeframeForm errors={errors} register={register} control={control} setValue={setValue}/>
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
export default TimeframeFormPage;
