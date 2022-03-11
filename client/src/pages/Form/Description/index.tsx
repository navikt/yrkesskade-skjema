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

import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import formUpdateAction from '../../../State/actions/formUpdateAction';
import { useNavigate } from 'react-router-dom';
import clearFormAction from '../../../State/actions/clearAction';

const DescriptionFormPage = () => {
  const { actions } = useStateMachine({ formUpdateAction, clearFormAction });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    actions.formUpdateAction(data);
    navigate('/yrkesskade/skjema/oppsummering');
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
            <BackButton
              url="/yrkesskade/skjema/skaden"
            />
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
export default DescriptionFormPage;
