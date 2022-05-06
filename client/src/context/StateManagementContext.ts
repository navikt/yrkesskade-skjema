/* eslint-disable react-hooks/exhaustive-deps */
import createUseContext from 'constate';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../core/hooks/state.hooks';
import { reset, selectSkademelding } from '../core/reducers/skademelding.reducer';
import { useInnloggetContext } from './InnloggetContext';
import { useSelectedCompany } from './SelectedCompanyContext';

const [StateManagementProvider, useState] = createUseContext(() => {
  const dispatch = useAppDispatch();
  const skademelding = useAppSelector((state) => selectSkademelding(state));
  const { innloggetBruker } = useInnloggetContext();
  const { selectedCompany } = useSelectedCompany();

  useEffect(() => {
    if (!innloggetBruker) {
      // Vi må ha en innlogget bruker for å kunne sjekke om vi skal slette state
      return;
    }

    if (!selectedCompany || selectedCompany.organisasjonsnummer === '-') {
      // Vi må ha en organisasjon for å kunne sjekke om vi skal slette state
      return;
    }

    if (!skademelding || !skademelding.innmelder || !skademelding.innmelder.norskIdentitetsnummer) {
      return;
    }

    if (
      (skademelding.innmelder.norskIdentitetsnummer && (innloggetBruker.fnr.toString() !== skademelding.innmelder.norskIdentitetsnummer)) ||
      (skademelding.innmelder.paaVegneAv && (selectedCompany.organisasjonsnummer !== skademelding.innmelder.paaVegneAv))
    ) {
      dispatch(reset());
      // state slettet
      return;
    }
  }, [
    skademelding.innmelder?.norskIdentitetsnummer,
    skademelding.innmelder?.paaVegneAv,
  ]);

  return {};
});

export { StateManagementProvider, useState };
