import axios from "axios";
import { useEffect, useState } from "react";
import createUseContext from 'constate';
import { EAllFeatureToggles } from "../types/feature-toggles";
import { useNavigate } from "react-router";

const [FeatureTogglesProvider, useFeatureToggles] = createUseContext(() => {
  const navigate = useNavigate();

  const [toggles, setToggles] = useState<EAllFeatureToggles>({
    DIGITAL_SKJEMA_INNSENDING: false,
    TEST: false,
    ER_IKKE_PROD: false
  });

  useEffect(() => {
    hentFeatureToggles();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const hentFeatureToggles = () => {
     return axios.get<EAllFeatureToggles>(`/yrkesskade/toggles`).then((response) => {
      setToggles(response.data);
    }).catch(error => {
      navigate('/yrkesskade/feilmelding')
    });
  }

  return {
    toggles,
  }
});

export { FeatureTogglesProvider, useFeatureToggles };
