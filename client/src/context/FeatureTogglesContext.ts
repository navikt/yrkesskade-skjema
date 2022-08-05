import axios from 'axios';
import { useEffect, useState } from 'react';
import createUseContext from 'constate';
import { EAllFeatureToggles } from '../types/feature-toggles';
import { useNavigate } from 'react-router';
import { useInnloggetContext } from './InnloggetContext';
import { InnloggetStatus } from '../utils/autentisering';
const [FeatureTogglesProvider, useFeatureToggles] = createUseContext(() => {
  const navigate = useNavigate();
  const { innloggetStatus } = useInnloggetContext();

  const defaultToggles: EAllFeatureToggles = {
    DIGITAL_SKJEMA_INNSENDING: false,
    TEST: false,
    ER_IKKE_PROD: false,
    SKADEMELDING_TILGJENGELIG: true,
  };

  const [toggles, setToggles] = useState<EAllFeatureToggles>(defaultToggles);

  useEffect(() => {
      hentFeatureToggles();
  }, [innloggetStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const hentFeatureToggles = () => {
    axios.get<EAllFeatureToggles>(`/yrkesskade/toggles`).then((response) => {
      if (response) {
        setToggles(response.data);
      }
    }).catch(error => {
      console.log('error', error);
      if (innloggetStatus !== InnloggetStatus.IKKE_VERIFISERT) {
        navigate('/yrkesskade/feilmelding', { state: error.message})
      }
    });
  }

  return {
    toggles,
  }
});

export { FeatureTogglesProvider, useFeatureToggles };
