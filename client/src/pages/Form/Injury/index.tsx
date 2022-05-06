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
import ExitButton from '../../../components/ExitButton';

import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Skademelding } from '../../../api/yrkesskade';
import { useAppDispatch } from '../../../core/hooks/state.hooks';
import { oppdaterSkademelding } from '../../../core/reducers/skademelding.reducer';

const InjuryFormPage = () => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    setError
  } = useFormContext<Skademelding>();

  const navigate = useNavigate();

  const onSubmit = (data: Skademelding) => {
    if (!data.skade?.skadedeDeler || data.skade.skadedeDeler.length === 0) {
      setError('skade.skadedeDeler', {
        type: 'manual',
        message: 'Dette feltet er påkrevd'
      });
      return;
    }

    dispatch(oppdaterSkademelding(data));
    navigate('/yrkesskade/skjema/beskrivelse');
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
            <InjuryForm />
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
export default InjuryFormPage;
