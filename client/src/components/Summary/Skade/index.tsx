// import { isNil } from "ramda";
import { Label, BodyShort, BodyLong, Table } from '@navikt/ds-react';
interface IProps {
  data: any;
}
const SkadeSummary = ({ data }: IProps) => {
  return (
    <div className="answerOuterContainer">
      <div className="answerContainer">
        <Table className="spacer">
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
      <div className="answerContainer">
        <Label>Har lege blitt kontaktet</Label>
        <BodyShort>{data.skade.legeKontaktet}</BodyShort>
      </div>
      <div className="answerContainer">
        <Label>Utfyllende beskrivelse</Label>
        <BodyLong>{data.hendelsesfakta.utfyllendeBeskrivelse}</BodyLong>
      </div>
    </div>
  );
};

export default SkadeSummary;
