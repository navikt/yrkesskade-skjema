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
// import { ISteps } from '../../../Interfaces/steps';
import ExitButton from '../../../components/ExitButton';

import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import formUpdateAction from '../../../State/actions/formUpdateAction';
import { useNavigate } from 'react-router-dom';
import clearFormAction from '../../../State/actions/clearAction';

const TimeframeFormPage = () => {
  const { actions, state } = useStateMachine({ formUpdateAction, clearFormAction});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm({
    defaultValues: {
      'hendelsesfakta.tid.tidstype': state.hendelsesfakta.tid.tidstype,
      'hendelsesfakta.naarSkjeddeUlykken': state.hendelsesfakta.naarSkjeddeUlykken
    }
  });
  // const cancel = useCancel();

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    actions.formUpdateAction(data);
    navigate('/yrkesskade/skjema/ulykken');
  };
  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
          <div className="cellContentContainer">
            <BackButton url="/yrkesskade/skjema/skadelidt" />
            <Heading
              size="2xlarge"
              className="pageNumberTitle spacer"
              data-number="3"
            >
              Tid og dato
            </Heading>
            <TimeframeForm errors={errors} register={register} control={control} setValue={setValue}/>
            <div className="buttonGroup">
             <ExitButton />
              <Button onClick={handleSubmit(onSubmit)} data-testid="neste-steg">Neste steg</Button>
            </div>
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
export default TimeframeFormPage;
