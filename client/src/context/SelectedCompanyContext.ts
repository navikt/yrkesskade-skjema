import { useState } from "react";
import { Organisasjon } from "../types/brukerinfo";
import createUseContext from 'constate';

const [SelectedCompanyProvider, useSelectedCompany] = createUseContext(() => {

  const [selectedCompany, setSelectedCompany] = useState<Organisasjon>({
    organisasjonsnummer: '-',
    navn: '-',
    type: '-',
    status: '-',
  } as Organisasjon);

  return {
    selectedCompany,
    setSelectedCompany
  }
});

export { SelectedCompanyProvider, useSelectedCompany };

