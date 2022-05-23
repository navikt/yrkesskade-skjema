// import { isNil } from "ramda";
import { Label, BodyShort, Table } from '@navikt/ds-react';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectKodeverk } from '../../../core/reducers/kodeverk.reducer';
import roller from '../../../utils/roller';
interface IProps {
  data: any;
}
const SkadeSummary = ({ data }: IProps) => {
  const skadetKroppsdelkoder = useAppSelector((state) => selectKodeverk(state, 'skadetKroppsdel'));
  const skadetypekoder = useAppSelector((state) => selectKodeverk(state, 'skadetype'));
  const fravaerkoder = useAppSelector((state) => selectKodeverk(state, 'harSkadelidtHattFravaer'));

  const rolletype =  data?.skadelidt?.dekningsforhold.rolletype;

  return (
    <div className="answerOuterContainer">
      <div className="answerContainer">
        <Table className="">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Område</Table.HeaderCell>
              <Table.HeaderCell>Skade</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.skade.skadedeDeler.map(
              (item: any, index: number) => {
                return (
                  <Table.Row key={index} data-testid="skade-tabell-rad">
                    <Table.DataCell>{skadetKroppsdelkoder && skadetKroppsdelkoder[item.kroppsdelTabellD]?.verdi}</Table.DataCell>
                    <Table.DataCell>{skadetypekoder && skadetypekoder[item.skadeartTabellC]?.verdi}</Table.DataCell>
                  </Table.Row>
                );
              }
            )}
          </Table.Body>
        </Table>
      </div>
      { roller[rolletype] && !roller[rolletype].isElevEllerStudent && (
      <div className="answerContainer spacer">
        <Label>Har den skadelidte hatt fravær</Label>
        <BodyShort>{fravaerkoder && fravaerkoder[data.skade.antattSykefravaerTabellH]?.verdi}</BodyShort>
      </div>
      )}
    </div>
  );
};

export default SkadeSummary;
