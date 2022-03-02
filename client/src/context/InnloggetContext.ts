/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import createUseContext from 'constate';
import {
  InnloggetStatus,
} from '../utils/autentisering';
import axios from 'axios';
import { Brukerinfo } from '../types/brukerinfo';
import { useErrorMessageContext } from './ErrorMessageContext';

const [InnloggetProvider, useInnloggetContext] = createUseContext(() => {
  const { setError } = useErrorMessageContext();
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
    return axios.get('/yrkesskade/innlogget').then(ressurs => {
      if (ressurs.status === 200) {
      return axios.get<Brukerinfo>(`/api/v1/brukerinfo`)
      .then((ressurs) => {
        if (ressurs.status === 200) {
            setInnloggetBruker(ressurs.data);
            setInnloggetStatus(InnloggetStatus.INNLOGGET);
        } else {
          setInnloggetStatus(InnloggetStatus.FEILET);
          setInnloggetBruker(null);
          setError('Klarte ikke hente nødvendige data');
        }
      })
      .catch((error) => {
        setInnloggetStatus(InnloggetStatus.FEILET);
        setInnloggetBruker(null);
        setError(`Klarte ikke hente nødvendige data:  ${error.message}`);
      });
      } else {
        setInnloggetStatus(InnloggetStatus.FEILET);
        setInnloggetBruker(null);
      }
    })
  };

  return {
    innloggetStatus,
    innloggetBruker,
  };
});

export { InnloggetProvider, useInnloggetContext };
