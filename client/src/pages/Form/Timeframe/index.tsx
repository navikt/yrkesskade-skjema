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
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/state.hooks';
import { useEffect } from 'react';
import { Skademelding, Tid } from '../../../api/yrkesskade';
import { oppdaterSkademelding, selectSkademelding } from '../../../core/reducers/skademelding.reducer';

const TimeframeFormPage = () => {
  const dispatch = useAppDispatch();
  const skademelding = useAppSelector((state) => selectSkademelding(state));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm<Skademelding>();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setValue('hendelsesfakta.tid.tidstype', skademelding.hendelsesfakta?.tid.tidstype || Tid.tidstype.TIDSPUNKT);
    setValue('hendelsesfakta.naarSkjeddeUlykken', skademelding.hendelsesfakta?.naarSkjeddeUlykken || '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onSubmit = (data: any) => {
    dispatch(oppdaterSkademelding(data));
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
