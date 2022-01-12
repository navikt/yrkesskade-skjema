import { isNil } from "ramda";
import { Label,BodyShort } from "@navikt/ds-react";
interface IProps {
  skadelidt: any;
}
const SkadelidtSummary = ({ skadelidt }: IProps) => {
  console.log(skadelidt);
  if (!isNil(skadelidt)) {
    return (
        <div className="answerOuterContainer">
          <div className="answerContainer">
            <Label>Skadelidtes fødselsnummer</Label>
            <BodyShort>{skadelidt.foedselsnummer}</BodyShort>
          </div>
          <div className="answerContainer">
            <Label>Skadelidtes rolle</Label>
            <BodyShort>{skadelidt.arbeidsforhold.rolletype}</BodyShort>
          </div>
          <div className="answerContainer">
            <Label>Skadelidtes stilling</Label>
            <BodyShort>{skadelidt.arbeidsforhold.stillingstittel}</BodyShort>
          </div>
        </div>
    );
  } else {
    return null;
  }
}

export default SkadelidtSummary;
