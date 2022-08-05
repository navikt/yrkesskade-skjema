/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import createUseContext from 'constate';
import {
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

  useEffect(() => {
    if (innloggetStatus === InnloggetStatus.IKKE_VERIFISERT) {
      verifiserAtBrukerErAutentisert(setInnloggetStatus, setInnloggetBruker);
    }
  }, [innloggetStatus, innloggetBruker]);

  const verifiserAtBrukerErAutentisert = (
    setInnloggetStatus: (innloggetStatus: InnloggetStatus) => void,
    setInnloggetBruker: (innloggetBruker: Brukerinfo | null) => void
  ) => {
    return axios.get<Brukerinfo>(`/user/profile`)
      .then((ressurs) => {
        if (ressurs.status === 200) {
            setInnloggetBruker(ressurs.data);
            setInnloggetStatus(InnloggetStatus.INNLOGGET);
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
