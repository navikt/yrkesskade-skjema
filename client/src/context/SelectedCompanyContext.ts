import { useState } from "react";
import { Organisasjon } from "../types/brukerinfo";
import createUseContext from 'constate';

const [SelectedCompanyProvider, useSelectedCompany] = createUseContext(() => {

  const [selectedCompany, setSelectedCompany] = useState<Organisasjon>({
    organisasjonsnummer: -1,
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

