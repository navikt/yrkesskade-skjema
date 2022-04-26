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
// import { ISteps } from '../../../Interfaces/steps';

import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import formUpdateAction from '../../../State/actions/formUpdateAction';
import { useNavigate } from 'react-router-dom';
import clearFormAction from '../../../State/actions/clearAction';
import { useCancel } from '../../../core/hooks/cancel.hooks';

const InjuredFormPage = () => {
  const { actions, state } = useStateMachine({ formUpdateAction, clearFormAction });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    defaultValues: {
      // 'skadelidt.dekningsforhold.stillingstittelTilDenSkadelidte': state.skadelidt.dekningsforhold.stillingstittelTilDenSkadelidte,
      'skadelidt.norskIdentitetsnummer': state.skadelidt.norskIdentitetsnummer,
      'skadelidt.dekningsforhold.rolletype': state.skadelidt.dekningsforhold.rolletype,
    }});
  const cancel = useCancel();

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    actions.formUpdateAction(data);
    navigate('/yrkesskade/skjema/tidsrom');
  };

  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
          <div className="cellContentContainer">
          <BackButton url="/yrkesskade/skjema/" />
            <Heading
              size="2xlarge"
              className="pageNumberTitle spacer"
              data-number="2"
            >
              Om den skadelidte
            </Heading>
            <InjuredForm errors={errors} register={register} control={control}/>
            <div className="buttonGroup">
              <Button variant="secondary" onClick={cancel}>
                Avbryt
              </Button>
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
export default InjuredFormPage;
