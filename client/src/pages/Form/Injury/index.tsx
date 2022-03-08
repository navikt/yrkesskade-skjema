import React from 'react';
import InjuryForm from '../../../components/Forms/Injury';
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

import StepIndicator from '../../../components/StepIndicator';
// import { ISteps } from '../../../Interfaces/steps';

import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import formUpdateAction from '../../../State/actions/formUpdateAction';
import { useNavigate } from 'react-router-dom';
import clearFormAction from '../../../State/actions/clearAction';

const InjuryFormPage = () => {
  const { actions, state } = useStateMachine({ formUpdateAction, clearFormAction });
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    resetField,
    setValue
  } = useForm({
    defaultValues: {
      'skade.antattSykefravaerTabellH': state.skade.antattSykefravaerTabellH
    }
  });

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    actions.formUpdateAction(data);
    navigate('/yrkesskade/skjema/beskrivelse');
  };
  const handleAbort = () => {
    actions.clearFormAction({});
    window.location.href = 'https://nav.no';
  };
  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
          <div className="cellContentContainer">
          <BackButton url="/yrkesskade/skjema/ulykken" />
            <Heading
              size="2xlarge"
              className="pageNumberTitle spacer"
              data-number="5"
            >
              Om skaden
            </Heading>
            <InjuryForm errors={errors} register={register} getValues={getValues} reset={resetField} setValue={setValue}/>
            <div className="buttonGroup">
              <Button variant="secondary" onClick={handleAbort}>
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
export default InjuryFormPage;
