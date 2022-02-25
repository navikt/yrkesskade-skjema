// import {isNil} from 'ramda';
import { Label, BodyLong } from '@navikt/ds-react';
interface IProps {
  data: any;
}
const BeskrivelseSummary = ({ data }: IProps) => {
  return (
    <div className="answerOuterContainer">
      <div className="answerContainer">
        <Label>Utfyllende beskrivelse</Label>
        <BodyLong>{data.hendelsesfakta.utfyllendeBeskrivelse}</BodyLong>
      </div>
    </div>
  );
};

export default BeskrivelseSummary;
