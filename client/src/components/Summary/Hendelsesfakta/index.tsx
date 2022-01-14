import './hendelsesfakta.less'
import { isNil } from "ramda";
import { Label,BodyShort } from "@navikt/ds-react";
interface IProps {
  hendelsesfakta: any;
}

const HendelsesfaktaSummary = ({ hendelsesfakta }: IProps) => {
  if (!isNil(hendelsesfakta)) {
    return (
        <div className="answerOuterContainer">
          <div className="answerContainer">
            <Label>Når skjedde ulykken?</Label>
            <BodyShort>{hendelsesfakta.tid.dato}</BodyShort>
          </div>
          <div className="answerContainer">
            <Label>Når på dagen skjedde ulykken?</Label>
            <BodyShort>{hendelsesfakta.tid.tidspunkt}</BodyShort>
          </div>
          <div className="answerContainer">
            <Label>Innenfor hvilket tidsrom inntraff skaden?</Label>
            <BodyShort>{hendelsesfakta.tid.tidstype}</BodyShort>
          </div>
          <div className="answerContainer">
            <Label>Hva er bakgrunn for ulykken?</Label>
            <BodyShort>{hendelsesfakta.bakgrunnsaarsakTabellB}</BodyShort>
          </div>
          <div className="answerContainer">
            <Label>Type ulykke?</Label>
            <BodyShort>{hendelsesfakta.typeUlykkeTabellA}</BodyShort>
          </div>
          <div className="answerContainer">
            <Label>Skjedde ulykken på arbeidsplassen?</Label>
            <BodyShort>{(hendelsesfakta.hvorSkjeddeUlykken = 1 ? "Ja" : "Nei")}</BodyShort>
          </div>
          <div className="longDescription">
            <Label>Utfyllende beskrivelse</Label>
            <BodyShort>{hendelsesfakta.utfyllendeBeskrivelse}</BodyShort>
          </div>
        </div>
    );
  } else {
    return null;
  }
};

export default HendelsesfaktaSummary;
