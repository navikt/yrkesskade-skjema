import AccidentForm from '../../../components/Forms/Accident';
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
// import { ISteps } from '../../../Interfaces/steps';

import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import formUpdateAction from '../../../State/actions/formUpdateAction';
import { useNavigate } from 'react-router-dom';
import clearFormAction from '../../../State/actions/clearAction';

const AccidentFormPage = () => {
  const { actions, state } = useStateMachine({ formUpdateAction, clearFormAction });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      'hendelsesfakta.ulykkessted.sammeSomVirksomhetensAdresse': state.hendelsesfakta.ulykkessted.sammeSomVirksomhetensAdresse,
      'hendelsesfakta.ulykkessted.adresse.adresselinje1': state.hendelsesfakta.ulykkessted.adresse?.adresselinje1,
      'hendelsesfakta.ulykkessted.adresse.adresselinje2': state.hendelsesfakta.ulykkessted.adresse?.adresselinje2,
      'hendelsesfakta.ulykkessted.adresse.adresselinje3': state.hendelsesfakta.ulykkessted.adresse?.adresselinje3,
      'hendelsesfakta.ulykkessted.adresse.land': state.hendelsesfakta.ulykkessted.adresse?.land,
      'skade.alvorlighetsgrad': state.skade.alvorlighetsgrad,
      'hendelsesfakta.hvorSkjeddeUlykken': state.hendelsesfakta.hvorSkjeddeUlykken,
      'hendelsesfakta.stedsbeskrivelseTabellF': state.hendelsesfakta.stedsbeskrivelseTabellF,
    }
  });

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    actions.formUpdateAction(data);
    navigate('/yrkesskade/skjema/skaden');
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
            <BackButton url="/yrkesskade/skjema/skadelidt" />
            <Heading
              size="2xlarge"
              className="pageNumberTitle spacer"
              data-number="4"
            >
              Om ulykken
            </Heading>
            <AccidentForm errors={errors} register={register} control={control} />
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
export default AccidentFormPage;
