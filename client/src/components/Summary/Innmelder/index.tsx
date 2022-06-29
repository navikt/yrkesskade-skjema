import { path } from 'ramda';
import { Label, BodyShort } from '@navikt/ds-react';
import { useInnloggetContext } from '../../../context/InnloggetContext';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectOrganisasjon } from '../../../core/reducers/app.reducer';
interface IProps {
  data: any;
}
const InnmelderSummary = ({ data }: IProps) => {
  const {innloggetBruker}  = useInnloggetContext();
  const organisasjon = useAppSelector((state) => selectOrganisasjon(state));

  return (
    <div className="answerOuterContainer">
      {path(['innmelder', 'norskIdentitetsnummer'], data) !==
        'undefined' && (
        <div className="answerContainer">
          <Label>Navn</Label>
          <BodyShort data-testid="summary-name">{innloggetBruker?.navn}</BodyShort>
        </div>
      )}
      {path(['innmelder', 'paaVegneAv'], data) !==
        'undefined' && (
        <div className="answerContainer">
          <Label>Virksomhet</Label>
          <BodyShort data-testid="summary-company-name">{organisasjon?.navn || 'UKJENT'}</BodyShort>
        </div>
      )}
    </div>
  );
};

export default InnmelderSummary;
