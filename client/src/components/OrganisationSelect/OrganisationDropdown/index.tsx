import { tomAltinnOrganisasjon } from '..';
import { Organisasjon } from '../../../types/brukerinfo';
import OrganisationItem from '../OrganisationItem';
import { finnOrganisasjonsSomskalHaFokus } from '../pilnavigeringfunksjoner';
import './OrganisationDropdown.less';

interface Props {
  organisasjoner: Organisasjon[];
  setErApen: (bool: boolean) => void;
  erApen: boolean;
  setOrganisasjonIFokus: (organisasjon: Organisasjon) => void;
  setForrigeOrganisasjonIFokus: (organisasjon: Organisasjon) => void;
  organisasjonIFokus: Organisasjon;
  forrigeOrganisasjonIFokus: Organisasjon
}
const OrganisationDropdown = ({
  organisasjoner,
  erApen,
  setErApen,
  organisasjonIFokus,
  forrigeOrganisasjonIFokus,
  setOrganisasjonIFokus,
  setForrigeOrganisasjonIFokus
}: Props) => {

  const setNyOrganisasjonIFokus = (keypressKey: string) => {
    const organisasjonsSomSkalFåFokus =
        finnOrganisasjonsSomskalHaFokus(organisasjonIFokus,keypressKey, erApen, organisasjoner);
    if (organisasjonsSomSkalFåFokus) {
        setOrganisasjonIFokus(organisasjonsSomSkalFåFokus);
    }
    else {
        setOrganisasjonIFokus(tomAltinnOrganisasjon)
    }
    setForrigeOrganisasjonIFokus(organisasjonIFokus)
}

const lukkMenyOnTabPaNedersteElement = (
  organisasjonsnummer: string
) => {
  const nedersteElement = organisasjoner[organisasjoner.length - 1];
  if (nedersteElement) {
      setErApen(false);
  }
};

  return (
    <div className="underenhetsvelger">
      <ul
                className={`underenhetsvelger__menyvalg-wrapper--${erApen ? 'apen' : 'lukket'}`}
                role="menu"
                aria-label={`Virksomheter`}
            >
        {organisasjoner.map((organisasjon) => (
          <OrganisationItem
            key={organisasjon.organisasjonsnummer}
            organisation={organisasjon}
            erApen={erApen} setErApen={setErApen}
            organisations={organisasjoner}
            lukkMenyOnTabPaNedersteElement={lukkMenyOnTabPaNedersteElement}
            organisasjonIFokus={organisasjonIFokus}
            forrigeOrganisasjonIFokus={forrigeOrganisasjonIFokus}
            setNyOrganisasjonIFokus={setNyOrganisasjonIFokus}
          />
        ))}
      </ul>
    </div>
  );
};

export default OrganisationDropdown;
