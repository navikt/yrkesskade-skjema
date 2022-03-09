/* eslint-disable react-hooks/exhaustive-deps */
import { useStateMachine } from 'little-state-machine';
import createUseContext from 'constate';
import clearFormAction from '../State/actions/clearAction';
import { useEffect } from 'react';
import { useInnloggetContext } from './InnloggetContext';
import { useSelectedCompany } from './SelectedCompanyContext';

const [StateManagementProvider, useState] = createUseContext(() => {
  const { state, actions } = useStateMachine({ clearFormAction });
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

    if (!state) {
      return;
    }

    if (
      innloggetBruker.fnr !== state.innmelder.norskIdentitetsnummer ||
      selectedCompany.organisasjonsnummer !== state.innmelder.paaVegneAv
    ) {
      console.log('state nullstilt');

      //actions.clearFormAction({});
      // state slettet
      return;
    }
  }, [
    innloggetBruker,
    innloggetBruker?.fnr,
    selectedCompany,
    selectedCompany.organisasjonsnummer,
    state?.innmelder.norskIdentitetsnummer,
    state?.innmelder.paaVegneAv,
  ]);

  return {};
});

export { StateManagementProvider, useState };
