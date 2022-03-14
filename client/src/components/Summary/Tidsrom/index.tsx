// import { isNil } from "ramda";
import { Label, BodyShort } from '@navikt/ds-react';
import { format, parseISO } from 'date-fns';
import { handleDateValue, handleTimeValue } from '../../../utils/date';
interface IProps {
  data: any;
}
const TidsromSummary = ({ data }: IProps) => {
  let accidentTime: Date | string | undefined;
  const timetype = data.hendelsesfakta.tid.tidstype.toLowerCase();
  // console.log(timetype);
  if (timetype === 'tidspunkt') {
    // force the date to a string with +''. Dum hack
    accidentTime = handleDateValue(data.hendelsesfakta.tid.tidspunkt);
  } else if (timetype === 'periode') {
    accidentTime = `${handleDateValue(data.hendelsesfakta.tid.periode.fra)} - ${handleDateValue(data.hendelsesfakta.tid.periode.til)}`;
  } else {
    accidentTime = 'Ukjent';
  }
  return (
    <div className="answerOuterContainer">
      <div className="answerContainer">
        <Label>Når skjedde ulykken som skal meldes</Label>
        {accidentTime}
      </div>
      <div className="answerContainer">
        <Label>Innenfor hvilket tidsrom inntraff skaden</Label>
        <BodyShort>{data.hendelsesfakta.naarSkjeddeUlykken}</BodyShort>
      </div>
    </div>
  );
};

export default TidsromSummary;
