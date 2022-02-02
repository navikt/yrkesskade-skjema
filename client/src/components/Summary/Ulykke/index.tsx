// import { isNil } from "ramda";
import { Label, BodyShort } from '@navikt/ds-react';
interface IProps {
  data: any;
}
const UlykkeSummary = ({ data }: IProps) => {
  return (
    <div className="answerOuterContainer">
      <div className="answerContainer">
        <Label>Hvor alvorlig er ulykken</Label>
        <BodyShort>{data.skade.alvorlighetsgrad}</BodyShort>
      </div>
      <div className="answerContainer">
        <Label>Skjedde ulykken på arbeidsplassen</Label>
        <BodyShort>{data.hendelsesfakta.hvorSkjeddeUlykken}</BodyShort>
      </div>
      <div className="answerContainer">
        <Label>Hva var årsaken til ulykken</Label>
        <BodyShort>{data.hendelsesfakta.typeUlykkeTabellA}</BodyShort>
      </div>
      <div className="answerContainer">
        <Label>Hva var bakgrunnen for ulykken</Label>
        <BodyShort>{data.hendelsesfakta.bakgrunnsaarsakTabellB}</BodyShort>
      </div>
    </div>
  );
};

export default UlykkeSummary;
