import React, { useEffect } from 'react';
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

import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Skademelding } from '../../../api/yrkesskade';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/state.hooks';
import { oppdaterSkademelding, selectSkademelding } from '../../../core/reducers/skademelding.reducer';

const InjuryFormPage = () => {
  const dispatch = useAppDispatch();
  const skademelding = useAppSelector((state) => selectSkademelding(state));
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    resetField,
    setValue
  } = useForm<Skademelding>();
  // const cancel = useCancel();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setValue('skade.antattSykefravaerTabellH', skademelding.skade?.antattSykefravaerTabellH || '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const onSubmit = (data: any) => {

    // dersom brukeren har lagt til en verdi i skade feltene, men ikke lagt til i listen, gjøres dette automatisk
    if (data.skade.kroppsdelTabellD && data.skade.skadeartTabellC) {
      // legg til skade til tabell
      const skade = { kroppsdelTabellD: data.skade.kroppsdelTabellD, skadeartTabellC: data.skade.skadeartTabellC };
      data.skade.skadedeDeler.push(skade);
      delete data.skade.kroppsdelTabellD;
      delete data.skade.skadeartTabellC;
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
            <InjuryForm errors={errors} register={register} getValues={getValues} reset={resetField} setValue={setValue}/>
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
