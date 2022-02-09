import { useEffect, useState } from 'react';
import { useSelectedCompany } from '../../../context/SelectedCompanyContext';
import { Organisasjon } from '../../../types/brukerinfo';
import {
  erPilNavigasjon
} from '../pilnavigeringfunksjoner';
import './OrganisationItem.less';

interface OrganisationItemProps {
  organisations: Organisasjon[];
  organisation: Organisasjon;
  erApen: boolean;
  setErApen: (bool: boolean) => void;
  setNyOrganisasjonIFokus: (
    KeypressKey: string
  ) => void;
  lukkMenyOnTabPaNedersteElement: (
    organisasjonsnummer: string
  ) => void;
  organisasjonIFokus: Organisasjon;
  forrigeOrganisasjonIFokus: Organisasjon;
}
const OrganisationItem = ({organisations, organisation, erApen, organisasjonIFokus, forrigeOrganisasjonIFokus, setNyOrganisasjonIFokus, lukkMenyOnTabPaNedersteElement}: OrganisationItemProps) => {
  const [isSelectedOrganisation, setIsSelectedOrganisation] = useState(false);
  const { selectedCompany, setSelectedCompany } = useSelectedCompany();
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setIsSelectedOrganisation(false);
    if (
      selectedCompany.organisasjonsnummer === organisation.organisasjonsnummer
    ) {
      setIsSelectedOrganisation(true);
    }
  }, [selectedCompany, organisation, organisation.organisasjonsnummer]);

  useEffect(() => {
    const skalSettesIFokus = organisasjonIFokus.organisasjonsnummer === organisation.organisasjonsnummer;
    if (skalSettesIFokus) {
      const organisationElementId = selectedCompany.organisasjonsnummer === organisation.organisasjonsnummer ?
                'valgtjuridiskenhet' : 'organisasjons-id-' + organisation.organisasjonsnummer;

        const element = document.getElementById(organisationElementId);
        element?.focus()
    }
}, [forrigeOrganisasjonIFokus,organisasjonIFokus, organisation.organisasjonsnummer, selectedCompany.organisasjonsnummer]);

  const changeCompany = () => {
    setSelectedCompany(organisation);
  };

  const onKeyDown = (key: string) => {
    if (key === 'Enter') {
      setSelectedCompany(organisasjonIFokus);
      return;
    }
    if (key === 'Tab') {
      lukkMenyOnTabPaNedersteElement(organisation.organisasjonsnummer.toString());
    }
    if (
      key === 'ArrowUp' ||
      key === 'ArrowDown' ||
      key === 'Up' ||
      key === 'Down'
    ) {
      setNyOrganisasjonIFokus(key);
    }
  };

  return (
    <li
      onClick={changeCompany}
      onKeyDown={(e) => {
        if (erPilNavigasjon(e.key)) {
          e.preventDefault();
          e.stopPropagation();
        }
        onKeyDown(e.key);
      }}
      onMouseOver={() => {
        if (!isSelectedOrganisation) {
          setHover(true);
        }
      }}
      onMouseLeave={() => {
        if (!isSelectedOrganisation) {
          setHover(false);
        }
      }}
      role="menuitem"
      className={`underenhet ${
        hover && isSelectedOrganisation
          ? 'valgtunderenhet-grey-on-hover'
          : isSelectedOrganisation && !hover
          ? 'valgtunderenhet'
          : ''
      }`}
      id={
        isSelectedOrganisation
          ? 'valgtunderenhet'
          : 'organisasjons-id-' + organisation.organisasjonsnummer
      }
      tabIndex={erApen ? 0 : -1}
    >
      <div>{organisation.navn}</div>
      <div>{organisation.organisasjonsnummer}</div>
    </li>
  );
};

export default OrganisationItem;
