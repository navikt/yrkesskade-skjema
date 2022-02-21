import axios from "axios";
import { useEffect, useState } from "react";
import createUseContext from 'constate';
import { EAllFeatureToggles } from "../types/feature-toggles";

const [FeatureTogglesProvider, useFeatureToggles] = createUseContext(() => {

  const [toggles, setToggles] = useState<EAllFeatureToggles>({
    DIGITAL_SKJEMA_INNSENDING: false,
    TEST: false,
    ER_IKKE_PROD: false
  });

  useEffect(() => {
    hentFeatureToggles();
  }, []);

  const hentFeatureToggles = () => {
     return axios.get<EAllFeatureToggles>(`/yrkesskade/toggles`).then((response) => {
      setToggles(response.data);
    });
  }

  return {
    toggles,
  }
});

export { FeatureTogglesProvider, useFeatureToggles };
