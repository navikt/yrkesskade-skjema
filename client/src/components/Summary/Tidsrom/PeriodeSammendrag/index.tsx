import { Periode } from '../../../../api/yrkesskade';
import { formatDate } from '../../../../utils/date';
import { parseISO } from 'date-fns';

interface IProps {
  perioder: Periode[];
}

const PeriodeSammendrag = ({ perioder }: IProps) => {
  const FORMAT: string = 'dd.MM.yyyy';

  return (
    <>
      {perioder.map((periode, index) => {
        const fraDato = periode.fra;
        const tilDato = periode.til;
        return <div key={index} data-testid="sammendrag-periode-rad">{`${formatDate(parseISO(fraDato!), FORMAT)} - ${formatDate(parseISO(tilDato!), FORMAT)}`}</div>;
      })}
    </>
  );
};

export default PeriodeSammendrag;
