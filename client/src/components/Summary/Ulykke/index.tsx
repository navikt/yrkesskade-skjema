import { isNil } from "ramda";
import { Label,BodyShort } from "@navikt/ds-react";
interface IProps {
  skade: any;
}
const SSkadeSummary = ({ skade }: IProps) => {
  console.log(skade);
  if (!isNil(skade)) {
    return (
        <div className="answerOuterContainer">
          <div className="answerContainer">
            <Label>Hvor alvorlig var ulykken</Label>
            <BodyShort>{skade.alvorlighetsgrad}</BodyShort>
          </div>
          <div className="answerContainer">
            <Label>Hvor på kroppen er skaden?</Label>
            <BodyShort>{skade.kroppsdelTabellD}</BodyShort>
          </div>
          <div className="answerContainer">
            <Label>Hva slags type skade er det?</Label>
            <BodyShort>{skade.skadeartTabellC}</BodyShort>
          </div>
          <div className="answerContainer">
            <Label>Er lege kontaktet?</Label>
            <BodyShort>{skade.legeKontaktet}</BodyShort>
          </div>
        </div>
    );
  } else {
    return null;
  }
}

export default SSkadeSummary;
