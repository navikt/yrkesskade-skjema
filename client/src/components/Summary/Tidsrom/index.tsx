// import { isNil } from "ramda";
import { Label, BodyShort } from '@navikt/ds-react';
import { format, parseISO } from 'date-fns';
// import { handleDateValue } from '../../../utils/date';
interface IProps {
  data: any;
}
const TidsromSummary = ({ data }: IProps) => {
  let accidentTime: String | undefined;
  const timetype = data.hendelsesfakta.tid.tidstype.toLowerCase();
  // console.log(timetype);
  if (timetype === 'tidspunkt') {
    // force the date to a string with +''. Dum hack
    accidentTime = format(
      parseISO(data.hendelsesfakta.tid.tidspunkt + ''),
      'dd.MM.yyyy HH:mm'
    );
  } else if (timetype === 'periode') {
    accidentTime = `${format(
      parseISO(data.hendelsesfakta.tid.periode.ƒra + ''),
      'dd.MM.yyyy HH:mm'
    )} - ${format(
      parseISO(data.hendelsesfakta.tid.periode.til + ''),
      'dd.MM.yyyy HH:mm'
    )}`;
  } else {
    accidentTime = 'Ukjent';
  }
  console.log(accidentTime);
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
