import { useEffect, useState } from 'react';

import createUseContext from 'constate';
import {
  autentiseringsInterceptor,
  InnloggetStatus,
} from '../utils/autentisering';
import axios from 'axios';

const [InnloggetProvider, useInnloggetContext] = createUseContext(() => {
  const [innloggetStatus, setInnloggetStatus] = useState<InnloggetStatus>(
    InnloggetStatus.IKKE_VERIFISERT
  );

  autentiseringsInterceptor();

  useEffect(() => {
    if (innloggetStatus === InnloggetStatus.IKKE_VERIFISERT) {
      verifiserAtBrukerErAutentisert(setInnloggetStatus);
    }
  }, [innloggetStatus]);

  const verifiserAtBrukerErAutentisert = (
    setInnloggetStatus: (innloggetStatus: InnloggetStatus) => void
  ) => {
    return axios
      .get(`/yrkesskade/innlogget`)
      .then((ressurs) => {
        console.log(ressurs);

        if (ressurs.status === 200) {
          setInnloggetStatus(InnloggetStatus.INNLOGGET);
        } else {
          setInnloggetStatus(InnloggetStatus.FEILET);
        }
      })
      .catch((error) => {
        setInnloggetStatus(InnloggetStatus.FEILET);
      });
  };

  return {
    innloggetStatus,
  };
});

export { InnloggetProvider, useInnloggetContext };
