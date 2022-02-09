import { useSelectedCompany } from '../../../context/SelectedCompanyContext';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import './OrganisationButton.less';
import UnderenhetIkon from '../UnderenhetIkon';
import { erPilNavigasjon, setFocusOnFirstOrganisation } from '../pilnavigeringfunksjoner';

interface Props {
  erApen: boolean;
  setErApen: (bool: boolean) => void;
}

const OrganisatonButton = ({ erApen, setErApen }: Props) => {
  const {
    selectedCompany: { navn, organisasjonsnummer }
  } = useSelectedCompany();

  const onKeyPress = (key: string, skift: boolean) => {
    if (key === 'ArrowDown' || key === 'Down') {
      if (erApen) {
          setFocusOnFirstOrganisation();
      }
    }
    if (key === 'Tab' && skift) {
      setErApen(false);
    }
  };

  return (
    <button
      onClick={() => {
        setErApen(!erApen);
      }}
      onKeyDown={(e) => {
        if (erPilNavigasjon(e.key)) {
            e.preventDefault();
            e.stopPropagation();
        }
        onKeyPress(e.key, e.shiftKey);
      }}
      className="menyknapp"
      id="virksomhetsvelger__button"
      aria-label={`Virksomhetsvelger. Valgt virksomhet er ${navn}, Trykk enter for å ${
        erApen ? 'lukke' : 'åpne'
      } denne menyen`}
      aria-pressed={erApen}
      aria-haspopup="true"
      aria-controls="virksomhetsvelger__dropdown"
      aria-expanded={erApen}
    >
      <div className="menyknapp__innhold">
        <UnderenhetIkon classname="menyknapp-ikon" />
        <div className="menyknapp-beskrivelse">
          <Element className="menyknapp-navn">{navn}</Element>
          <Normaltekst>virksomhetsnr. {organisasjonsnummer}</Normaltekst>
        </div>
      </div>
    </button>
  );
};

export default OrganisatonButton;
