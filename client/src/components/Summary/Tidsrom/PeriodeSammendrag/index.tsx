import { Periode } from '../../../../api/yrkesskade';
import { formatDate } from '../../../../utils/date';
import { parseISO } from 'date-fns';

interface IProps {
  perioder: Periode[] | Periode;
}

const PeriodeSammendrag = ({ perioder }: IProps) => {
  const FORMAT: string = 'dd.MM.yyyy';

  return (
    <>
      {Array.isArray(perioder) && perioder.map((periode, index) => {
        const fraDato = periode.fra;
        const tilDato = periode.til;
        return <div key={index} data-testid="sammendrag-periode-rad">{`${formatDate(parseISO(fraDato!), FORMAT)} - ${formatDate(parseISO(tilDato!), FORMAT)}`}</div>;
      })}
      {!Array.isArray(perioder) && (
        <div data-testid="sammendrag-periode-rad">{`${formatDate(parseISO(perioder.fra!), FORMAT)} - ${formatDate(parseISO(perioder.til!), FORMAT)}`}</div>
      )}
    </>
  );
};

export default PeriodeSammendrag;
