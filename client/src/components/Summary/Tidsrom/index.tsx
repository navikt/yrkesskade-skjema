// import { isNil } from "ramda";
import { Label, BodyShort } from '@navikt/ds-react';
interface IProps {
  data: any;
}
const TidsromSummary = ({ data }: IProps) => {
  return (
    <div className="answerOuterContainer">
      <div className="answerContainer">
        <Label>Når skjedde ulykken som skal meldes</Label>
        <BodyShort>{data.hendelsesfakta.tid.dato} {data.hendelsesfakta.tid.tidspunkt}</BodyShort>
      </div>
      <div className="answerContainer">
        <Label>Innenfor hvilket tidsrom inntraff skaden</Label>
        <BodyShort>{data.hendelsesfakta.tid.tidstype}</BodyShort>
      </div>
      {data.hendelsesfakta.tid.tidstype.annet && (
        <div className="answerContainer">
          <Label>Innenfor hvilket tidsrom inntraff skaden</Label>
          <BodyShort>{data.hendelsesfakta.tid.tidstype}</BodyShort>
        </div>
      )}
    </div>
  );
};

export default TidsromSummary;
