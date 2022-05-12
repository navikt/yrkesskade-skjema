import axios from 'axios';
import { useEffect, useState } from 'react';
import createUseContext from 'constate';
import { EAllFeatureToggles } from '../types/feature-toggles';
import { useNavigate } from 'react-router';
import { useInnloggetContext } from './InnloggetContext';
import { InnloggetStatus } from '../utils/autentisering';
import { useErrorMessageContext } from './ErrorMessageContext';

const [FeatureTogglesProvider, useFeatureToggles] = createUseContext(() => {
  const navigate = useNavigate();
  const { innloggetStatus } = useInnloggetContext();
  const { setError } = useErrorMessageContext();

  const [toggles, setToggles] = useState<EAllFeatureToggles>({
    DIGITAL_SKJEMA_INNSENDING: false,
    TEST: false,
    ER_IKKE_PROD: false,
    SKADEMELDING_TILGJENGELIG: true,
  });

  useEffect(() => {
      hentFeatureToggles();
  }, [innloggetStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const hentFeatureToggles = () => {
     return axios.get<EAllFeatureToggles>(`/yrkesskade/toggles`).then((response) => {
      setToggles(response.data);
    }).catch(error => {
      if (innloggetStatus !== InnloggetStatus.IKKE_VERIFISERT) {
        setError(error.message);
        navigate('/yrkesskade/feilmelding')
      }
    });
  }

  return {
    toggles,
  }
});

export { FeatureTogglesProvider, useFeatureToggles };
