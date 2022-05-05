// import { isNil } from "ramda";
import { Label, BodyShort } from '@navikt/ds-react';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectKodeverk } from '../../../core/reducers/kodeverk.reducer';
interface IProps {
  data: any;
}
const SkadelidtSummary = ({ data }: IProps) => {
  const rolletypekoder = useAppSelector((state) =>
    selectKodeverk(state, 'rolletype')
  );
  const stillingstittelkoder = useAppSelector((state) =>
    selectKodeverk(state, 'stillingstittel')
  );

  return (
    <div className="answerOuterContainer">
      {data.skadelidt.dekningsforhold.rolletype.toLowerCase() !== 'elev' && (
        <div className="answerContainer">
          <Label>Hva er skadelidtes stilling</Label>
          <BodyShort>
            {stillingstittelkoder &&
              stillingstittelkoder[
                data.skadelidt.dekningsforhold.stillingstittelTilDenSkadelidte
              ]?.verdi}
          </BodyShort>
        </div>
      )}
      <div className="answerContainer">
        <Label>Den skadelidtets tilknyttning til virksomheten</Label>
        <BodyShort>
          {rolletypekoder &&
            rolletypekoder[data.skadelidt.dekningsforhold.rolletype]?.verdi}
        </BodyShort>
      </div>
      <div className="answerContainer">
        <Label>Hva er skadelidtes fødselsnummer</Label>
        <BodyShort>{data.skadelidt.norskIdentitetsnummer}</BodyShort>
      </div>
    </div>
  );
};

export default SkadelidtSummary;
