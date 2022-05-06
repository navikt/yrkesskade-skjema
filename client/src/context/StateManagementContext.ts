/* eslint-disable react-hooks/exhaustive-deps */
import { useStateMachine } from 'little-state-machine';
import createUseContext from 'constate';
import clearFormAction from '../State/actions/clearAction';
import { useEffect } from 'react';
import { useInnloggetContext } from './InnloggetContext';
import { useSelectedCompany } from './SelectedCompanyContext';
import { useAppSelector } from '../core/hooks/state.hooks';
import { selectOrganisasjon } from '../core/reducers/app.reducer';

const [StateManagementProvider, useState] = createUseContext(() => {
  const { state, actions } = useStateMachine({ clearFormAction });
  const { innloggetBruker } = useInnloggetContext();
  const { selectedCompany } = useSelectedCompany();
  const valgtOrganisasjon = useAppSelector((state) => selectOrganisasjon(state))

  useEffect(() => {
    if (!innloggetBruker) {
      // Vi må ha en innlogget bruker for å kunne sjekke om vi skal slette state
      return;
    }

    if (!selectedCompany || selectedCompany.organisasjonsnummer === '-') {
      // Vi må ha en organisasjon for å kunne sjekke om vi skal slette state
      return;
    }

    if (!state || !state.innmelder || !state.innmelder.norskIdentitetsnummer) {
      return;
    }

    if (
      (state.innmelder.norskIdentitetsnummer && (innloggetBruker.fnr !== state.innmelder.norskIdentitetsnummer)) ||
      (state.innmelder.paaVegneAv && (selectedCompany.organisasjonsnummer !== state.innmelder.paaVegneAv))
    ) {
      actions.clearFormAction({});
      // state slettet
      return;
    }
  }, [
    state.innmelder.norskIdentitetsnummer,
    state.innmelder.paaVegneAv,
  ]);

  return {};
});

export { StateManagementProvider, useState };
