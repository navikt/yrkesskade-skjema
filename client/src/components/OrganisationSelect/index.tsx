import { useEffect, useState } from 'react';
import { useSelectedCompany } from '../../context/SelectedCompanyContext';
import { Organisasjon } from '../../types/brukerinfo';
import OrganisationButton from './OrganisationButton';
import OrganisationDropdown from './OrganisationDropdown';
import './OrganisationSelect.less';

interface OrganisationSelectProps {
  organisasjoner: Organisasjon[];
  onOrganisasjonChange: (organisasjon: Organisasjon) => void;
}

export const tomAltinnOrganisasjon: Organisasjon = {
  organisasjonsnummer: '-',
  navn: '-',
  naeringskode: '-',
  status: '-',
  organisasjonsform: '-',
  type: '-',
};

const OrganisationSelect = ({organisasjoner, onOrganisasjonChange}: OrganisationSelectProps) => {
  const { selectedCompany, setSelectedCompany } = useSelectedCompany();
  const [erApen, setErApen] = useState(false);
  const [organisasjonIFokus, setOrganisasjonIFokus] = useState(tomAltinnOrganisasjon);
    const [forrigeOrganisasjonIFokus, setForrigeOrganisasjonIFokus] = useState(tomAltinnOrganisasjon);

  useEffect(() => {
    onOrganisasjonChange(selectedCompany);
    setOrganisasjonIFokus(selectedCompany);
    setErApen(false);
  }, [onOrganisasjonChange, selectedCompany]);

  useEffect(() => {
    setSelectedCompany(organisasjoner[0]);
  }, [organisasjoner, setSelectedCompany]);

  const showOrganisationSelect =
    organisasjoner && organisasjoner?.length > 0;

  return showOrganisationSelect ? (
    <div aria-label="Velg virksomhet" className="">
      <OrganisationButton erApen={erApen} setErApen={setErApen} />
      {erApen && (
        <div
          role="toolbar"
          className={`virksomhetsvelger__dropdown--${
            erApen ? 'apen' : 'lukket'
          }`}
          aria-hidden={!erApen}
          id="virksomhetsvelger__dropdown"
        >
          <div className="dropdownmeny-elementer-wrapper">
            <div className={`dropdownmeny-elementer`}>
              <OrganisationDropdown
                organisasjoner={organisasjoner}
                erApen={erApen}
                setErApen={setErApen}
                organisasjonIFokus={organisasjonIFokus}
                setOrganisasjonIFokus={setOrganisasjonIFokus}
                forrigeOrganisasjonIFokus={forrigeOrganisasjonIFokus}
                setForrigeOrganisasjonIFokus={setForrigeOrganisasjonIFokus} />
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default OrganisationSelect;
