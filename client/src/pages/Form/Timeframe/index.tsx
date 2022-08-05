import TimeframeForm from '../../../components/Forms/Timeframe';
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
import {
  useAppDispatch,
  useAppSelector,
} from '../../../core/hooks/state.hooks';
import { useEffect } from 'react';
import { Skademelding, Tid } from '../../../api/yrkesskade';
import {
  oppdaterSkademelding,
  resetAarsakUlykkeOgBakgrunnAaarsak,
  resetPaavirkningsform,
  selectSkademelding,
} from '../../../core/reducers/skademelding.reducer';
import { useCheckIfReloaded } from '../../../core/hooks/reloadCheck.hooks';
import { isEmpty } from 'lodash';
import { DateUtils } from 'react-day-picker';
import { parseISO } from 'date-fns';

import roller from '../../../utils/roller';

const TimeframeFormPage = () => {
  useCheckIfReloaded();
  const dispatch = useAppDispatch();
  const skademelding = useAppSelector((state) => selectSkademelding(state));
  const rolletype = skademelding.skadelidt?.dekningsforhold.rolletype || '';

  const { handleSubmit, setValue, setError } = useFormContext<Skademelding>();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setValue(
      'hendelsesfakta.tid.tidstype',
      skademelding.hendelsesfakta?.tid.tidstype || Tid.tidstype.TIDSPUNKT
    );
    setValue(
      'hendelsesfakta.naarSkjeddeUlykken',
      skademelding.hendelsesfakta?.naarSkjeddeUlykken || ''
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onSubmit = (data: Skademelding) => {
    let harFeil = false; // for at vi skal få med alle valideringer på samme submit.
    if (isEmpty(data.hendelsesfakta.naarSkjeddeUlykken)) {
      setError('hendelsesfakta.naarSkjeddeUlykken', {
        type: 'manual',
        message: 'Dette feltet er påkrevd',
      });
      harFeil = true;
    }

    if (data.hendelsesfakta.tid.tidstype === Tid.tidstype.PERIODE) {
      dispatch(resetAarsakUlykkeOgBakgrunnAaarsak());
      // valider at vi har minst en periode satt
      if (
        !data.hendelsesfakta.tid.perioder ||
        data.hendelsesfakta.tid.perioder.length === 0
      ) {
        setError('hendelsesfakta.tid.perioder', {
          type: 'manual',
          message: 'Minst en periode er påkrevd',
        });
        harFeil = true;
      }
    }

    if (data.hendelsesfakta.tid.tidstype === Tid.tidstype.TIDSPUNKT) {
      dispatch(resetPaavirkningsform());
      if (
        isEmpty(data.hendelsesfakta.tid.tidspunkt) ||
        !DateUtils.isDate(parseISO(data.hendelsesfakta.tid.tidspunkt!))
      ) {
        setError('hendelsesfakta.tid.tidspunkt', {
          type: 'manual',
          message: 'Dette feltet er påkrevd',
        });
        harFeil = true;
      }
    }

    if (harFeil) {
      return;
    }

    dispatch(oppdaterSkademelding(data));
    if (roller[rolletype] && roller[rolletype].showAccidentPlacePage) {
      navigate('/yrkesskade/skjema/ulykkessted');
    } else {
      navigate('/yrkesskade/skjema/ulykken');
    }
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
              size="xlarge"
              className="pageNumberTitle spacer"
              data-number="3"
            >
              Tid og dato
            </Heading>
            <TimeframeForm />
            <div className="buttonGroup">
              <ExitButton />
              <Button onClick={handleSubmit(onSubmit)} data-testid="neste-steg">
                Neste steg
              </Button>
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
