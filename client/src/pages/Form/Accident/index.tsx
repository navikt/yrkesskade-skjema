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
import ExitButton from '../../../components/ExitButton';

import { useFormContext } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Skademelding } from '../../../api/yrkesskade';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/state.hooks';
import { oppdaterSkademelding, selectSkademelding } from '../../../core/reducers/skademelding.reducer';
import { useCheckIfReloaded } from '../../../core/hooks/reloadCheck.hooks';

import roller from '../../../utils/roller';

const AccidentFormPage = () => {
  useCheckIfReloaded();
  const dispatch = useAppDispatch();
  const skademelding =  useAppSelector((state) => selectSkademelding(state));
  const rolletype = skademelding.skadelidt?.dekningsforhold.rolletype || '';

  const location = useLocation();
  const {
    handleSubmit,
    setValue
  } = useFormContext<Skademelding>();

  const navigate = useNavigate();

  const onSubmit = (data: Skademelding) => {
    dispatch(oppdaterSkademelding(data));
    navigate('/yrkesskade/skjema/skaden');
  };

  useEffect(() => {
      setValue('hendelsesfakta.ulykkessted.adresse.adresselinje1', skademelding.hendelsesfakta?.ulykkessted.adresse?.adresselinje1 || '');
      setValue('hendelsesfakta.ulykkessted.adresse.adresselinje2', skademelding.hendelsesfakta?.ulykkessted.adresse?.adresselinje2 || '');
      setValue('hendelsesfakta.ulykkessted.adresse.adresselinje3', skademelding.hendelsesfakta?.ulykkessted.adresse?.adresselinje3);
      setValue('hendelsesfakta.ulykkessted.adresse.land', skademelding.hendelsesfakta?.ulykkessted.adresse?.land || '');
      setValue('hendelsesfakta.hvorSkjeddeUlykken', skademelding.hendelsesfakta?.hvorSkjeddeUlykken || '');
      setValue('hendelsesfakta.stedsbeskrivelse', skademelding.hendelsesfakta?.stedsbeskrivelse || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  let backUrl = '/yrkesskade/skjema/tidsrom';
  if (roller[rolletype] && roller[rolletype].showAccidentPlacePage) {
   backUrl = '/yrkesskade/skjema/ulykkessted';
  }
  const isPeriod = skademelding?.hendelsesfakta?.tid?.tidstype === 'Periode';

  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
          <div className="cellContentContainer">
            <BackButton url={backUrl} />
            <Heading
              size="xlarge"
              className="pageNumberTitle spacer"
              data-number="4"
            >
              {isPeriod ? 'Om den skadelige påvirkningen' : 'Om ulykken'}
            </Heading>
            <AccidentForm />
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
export default AccidentFormPage;
