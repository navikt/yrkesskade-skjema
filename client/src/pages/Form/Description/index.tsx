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
import ExitButton from '../../../components/ExitButton';

import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../core/hooks/state.hooks';
import { oppdaterSkademelding } from '../../../core/reducers/skademelding.reducer';

const DescriptionFormPage = () => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
  } = useFormContext();

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    dispatch(oppdaterSkademelding(data));
    navigate('/yrkesskade/skjema/oppsummering');
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
            <DescriptionForm />
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
export default DescriptionFormPage;
