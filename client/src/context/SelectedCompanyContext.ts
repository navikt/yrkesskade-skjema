import { useState } from "react";
import { Organisasjon } from "../types/brukerinfo";
import createUseContext from 'constate';
import { AdresseDto } from "../api/yrkesskade";

const [SelectedCompanyProvider, useSelectedCompany] = createUseContext(() => {

  const [selectedCompany, setSelectedCompany] = useState<Organisasjon>({
    organisasjonsnummer: '-',
    navn: '-',
    type: '-',
    status: '-',
  } as Organisasjon);

  const [selectedAddress, setSelectedAddress] = useState<AdresseDto | null>()

  return {
    selectedCompany,
    setSelectedCompany,
    selectedAddress,
    setSelectedAddress
  }
});

export { SelectedCompanyProvider, useSelectedCompany };

