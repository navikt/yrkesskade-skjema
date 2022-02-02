// import { isNil } from "ramda";
import { Label, BodyShort } from '@navikt/ds-react';
interface IProps {
  data: any;
}
const SkadelidtSummary = ({ data }: IProps) => {
  return (
    <div className="answerOuterContainer">
      <div className="answerContainer">
        <Label>Hva er skadeliteds stilling</Label>
        <BodyShort>{data.skadelidt.arbeidsforhold.stillingstittel}</BodyShort>
      </div>
      <div className="answerContainer">
        <Label>Hva er skadeliteds fødselsnummer</Label>
        <BodyShort>{data.skadelidt.foedselsnummer}</BodyShort>
      </div>
    </div>
  );
};

export default SkadelidtSummary;
