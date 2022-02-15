import { useState } from "react";
import { Adresse, Organisasjon } from "../types/brukerinfo";
import createUseContext from 'constate';

const [SelectedCompanyProvider, useSelectedCompany] = createUseContext(() => {

  const [selectedCompany, setSelectedCompany] = useState<Organisasjon>({
    organisasjonsnummer: '-',
    navn: '-',
    type: '-',
    status: '-',
  } as Organisasjon);

  const [selectedAddress, setSelectedAddress] = useState<Adresse | null>()

  return {
    selectedCompany,
    setSelectedCompany,
    selectedAddress,
    setSelectedAddress
  }
});

export { SelectedCompanyProvider, useSelectedCompany };

