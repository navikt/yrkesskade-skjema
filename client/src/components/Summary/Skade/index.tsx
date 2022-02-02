// import { isNil } from "ramda";
import { Label,BodyShort, BodyLong } from "@navikt/ds-react";
interface IProps {
  data: any;
}
const SkadeSummary = ({ data }: IProps) => {
    return (
        <div className="answerOuterContainer">
          <div className="answerContainer">
            <Label>Hvor på kroppen er skaden</Label>
            <BodyShort>{data.skade.kroppsdelTabellD}</BodyShort>
          </div>
          <div className="answerContainer">
            <Label>Hva slags skade er det</Label>
            <BodyShort>{data.skade.skadeartTabellC}</BodyShort>
          </div>
          <div className="answerContainer">
            <Label>Har lege blitt kontaktet</Label>
            <BodyShort>{data.skade.legeKontaktet}</BodyShort>
          </div>
          <div className="answerContainer">
            <Label>Utfyllende beskrivelse</Label>
            <BodyLong>{data.hendelsesfakta.utfyllendeBeskrivelse}</BodyLong>
          </div>
        </div>
    );
}

export default SkadeSummary;
