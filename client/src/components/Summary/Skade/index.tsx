// import { isNil } from "ramda";
import { Label, BodyShort, Table } from '@navikt/ds-react';
import { get } from 'lodash';
interface IProps {
  data: any;
}
const SkadeSummary = ({ data }: IProps) => {
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
              // (item: { damage?: string; bodypart?: string }, index: number) => {
              (item: any, index: number) => {
                return (
                  <Table.Row key={index}>
                    <Table.DataCell>{item.kroppsdelTabellD}</Table.DataCell>
                    <Table.DataCell>{item.skadeartTabellC}</Table.DataCell>
                  </Table.Row>
                );
              }
            )}
          </Table.Body>
        </Table>
      </div>
      {get(data, [
        'skadelidt',
        'dekningsforhold',
        'rolletype',
      ]).toLowerCase() !== 'elev' && (
        <div className="answerContainer spacer">
          <Label>Har den skadelidte hatt fravær</Label>
          <BodyShort>{data.skade.antattSykefravaerTabellH}</BodyShort>
        </div>
      )}
    </div>
  );
};

export default SkadeSummary;
