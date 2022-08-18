// import { isNil } from "ramda";
import { Label, BodyShort } from '@navikt/ds-react';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectKodeverk } from '../../../core/reducers/kodeverk.reducer';
import PeriodeSammendrag from '../Tidsrom/PeriodeSammendrag';
import roller from '../../../utils/roller';
interface IProps {
  data: any;
}
const SkadelidtSummary = ({ data }: IProps) => {
  const rolletypekoder = useAppSelector((state) => selectKodeverk(state, 'rolletype'));
  const stillingstittelkoder = useAppSelector((state) => selectKodeverk(state, 'stillingstittel'));
  const rolletype =  data?.skadelidt?.dekningsforhold.rolletype;
  return (
    <div className="answerOuterContainer">
      {roller[rolletype] && roller[rolletype].showStillinger && (
      <div className="answerContainer">
        <Label>Hva er skadelidtes stilling</Label>
        <BodyShort>{stillingstittelkoder && stillingstittelkoder[data.skadelidt.dekningsforhold.stillingstittelTilDenSkadelidte]?.verdi}</BodyShort>
      </div>
      )}
      <div className="answerContainer">
        <Label>Den skadelidtets tilknyttning til virksomheten</Label>
        <BodyShort>{rolletypekoder && rolletypekoder[data.skadelidt.dekningsforhold.rolletype]?.verdi}</BodyShort>
      </div>
      <div className="answerContainer">
        <Label>Hva er skadelidtes fødselsnummer</Label>
        <BodyShort>{data.skadelidt.norskIdentitetsnummer}</BodyShort>
      </div>
      {roller[rolletype] && roller[rolletype].showServicePeriode && (
      <div className="answerContainer">
        <Label>Periode for tjenesten</Label>
        <PeriodeSammendrag perioder={data.skadelidt.dekningsforhold.tjenesteperiode!} />
      </div>
      )}
       {roller[rolletype] && roller[rolletype].showServiceDepartment && (
      <div className="answerContainer">
        <Label>Tjenestegjørende avdeling</Label>
        <BodyShort>{data.skadelidt.dekningsforhold.tjenestegjoerendeAvdeling}</BodyShort>
      </div>
      )}
    </div>
  );
};

export default SkadelidtSummary;
