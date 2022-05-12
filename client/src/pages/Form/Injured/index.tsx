import { useEffect } from 'react';
import InjuredForm from '../../../components/Forms/Injured';
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
import { Skademelding } from '../../../api/yrkesskade';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/state.hooks';
import { oppdaterSkademelding, selectSkademelding } from '../../../core/reducers/skademelding.reducer';
import { useSelectedCompany } from '../../../context/SelectedCompanyContext';
import { useCheckIfReloaded } from '../../../core/hooks/reloadCheck.hooks';

const InjuredFormPage = () => {
  useCheckIfReloaded();
  const dispatch = useAppDispatch();
  const skademelding = useAppSelector((state) => selectSkademelding(state))
  const {
    handleSubmit,
    setValue
  } = useFormContext<Skademelding>();
  const valgtVirksomhet = useSelectedCompany();

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data: any) => {
    dispatch(oppdaterSkademelding(data));
    navigate('/yrkesskade/skjema/tidsrom');
  };

  useEffect(() => {
    setValue('skadelidt.norskIdentitetsnummer', skademelding.skadelidt?.norskIdentitetsnummer || '');
    setValue('skadelidt.dekningsforhold.rolletype', skademelding.skadelidt?.dekningsforhold.rolletype || '')
    setValue('skadelidt.dekningsforhold.navnPaaVirksomheten', valgtVirksomhet.selectedCompany.navn)
    setValue('skadelidt.dekningsforhold.virksomhetensAdresse.adresselinje1', valgtVirksomhet.selectedAddress?.adresser[0] || '');
    setValue('skadelidt.dekningsforhold.virksomhetensAdresse.adresselinje2', valgtVirksomhet.selectedAddress?.postnummer);
    setValue('skadelidt.dekningsforhold.virksomhetensAdresse.adresselinje3', valgtVirksomhet.selectedAddress?.poststed);
    setValue('skadelidt.dekningsforhold.virksomhetensAdresse.land', valgtVirksomhet.selectedAddress?.landkode);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, setValue])

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
            <InjuredForm />
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
export default InjuredFormPage;
