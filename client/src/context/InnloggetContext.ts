import { useEffect, useState } from 'react';

import createUseContext from 'constate';
import {
  autentiseringsInterceptor,
  InnloggetStatus,
} from '../utils/autentisering';
import axios from 'axios';
import { Brukerinfo } from '../types/brukerinfo';

const [InnloggetProvider, useInnloggetContext] = createUseContext(() => {
  const [innloggetStatus, setInnloggetStatus] = useState<InnloggetStatus>(
    InnloggetStatus.IKKE_VERIFISERT
  );

  const [innloggetBruker, setInnloggetBruker] = useState<Brukerinfo|null>(
    null
  )

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
        if (ressurs.status === 200) {
          axios.get<Brukerinfo>(`/api/v1/brukerinfo`).then((response) => {
            setInnloggetBruker(response.data);
            setInnloggetStatus(InnloggetStatus.INNLOGGET);
          });
        } else {
          setInnloggetStatus(InnloggetStatus.FEILET);
          setInnloggetBruker(null);
        }
      })
      .catch((error) => {
        setInnloggetStatus(InnloggetStatus.FEILET);
        setInnloggetBruker(null);
      });
  };

  return {
    innloggetStatus,
    innloggetBruker,
  };
});

export { InnloggetProvider, useInnloggetContext };
