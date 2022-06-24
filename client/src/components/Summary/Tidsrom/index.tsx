// import { isNil } from "ramda";
import { Label, BodyShort } from '@navikt/ds-react';
import { format, parseISO } from 'date-fns';
import { Skademelding } from '../../../api/yrkesskade';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectKodeverk } from '../../../core/reducers/kodeverk.reducer';
import PeriodeSammendrag from './PeriodeSammendrag';
// import { handleDateValue } from '../../../utils/date';
interface IProps {
  data: Skademelding;
}
const TidsromSummary = ({ data }: IProps) => {
  const FORMAT = 'dd.MM.yyyy';
  const tidsromkoder = useAppSelector((state) =>
    selectKodeverk(state, 'tidsrom')
  );
  let accidentTime: React.ReactElement | undefined;
  const timetype = data.hendelsesfakta.tid.tidstype.toLowerCase();

  if (timetype === 'tidspunkt') {
    // force the date to a string with +''. Dum hack

    accidentTime = <span>{format(
      parseISO(data.hendelsesfakta.tid.tidspunkt!),
      `${FORMAT} HH:mm`
    )}</span>;
  } else if (timetype === 'periode') {
    accidentTime = <PeriodeSammendrag perioder={data.hendelsesfakta.tid.perioder!} />
  } else {
    accidentTime = <span>{'Ukjent'}</span>;
  }
  return (
    <div className="answerOuterContainer">
      <div className="answerContainer">
        <Label>Når skjedde ulykken som skal meldes</Label>
        <BodyShort spacing data-testid="summary-time">
          {accidentTime}
        </BodyShort>
      </div>
      {timetype === 'periode' && data.hendelsesfakta.tid.sykdomPaavist && (
        <div className="answerContainer">
          <Label>Når ble sykdommen påvist?</Label>
          <BodyShort>{`${format(
            parseISO(data.hendelsesfakta.tid.sykdomPaavist!),
            'dd.MM.yyyy'
          )}`}</BodyShort>
        </div>
      )}
      <div className="answerContainer">
        <Label>Innenfor hvilket tidsrom inntraff skaden</Label>
        <BodyShort>
          {tidsromkoder &&
            tidsromkoder[data.hendelsesfakta.naarSkjeddeUlykken]?.verdi}
        </BodyShort>
      </div>
    </div>
  );
};

export default TidsromSummary;
