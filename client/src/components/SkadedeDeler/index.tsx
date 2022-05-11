/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-operators */
import { AddCircle, MinusCircle } from "@navikt/ds-icons";
import { Button, Select, Table } from "@navikt/ds-react";
import { remove } from "ramda";
import { useEffect, useState } from "react";
import { KodeverdiDto } from "../../api/kodeverk";
import { SkadetDel } from "../../api/yrkesskade";

interface IProps {
  onSkadededelerChange: (skadedeDeler: SkadetDel[]) => void;
  skadedeDeler: SkadetDel[],
  skadeartKoder: Record<string, KodeverdiDto | undefined> | undefined;
  kroppsdelKode: Record<string, KodeverdiDto | undefined> | undefined;
}

const SkadedeDeler = (props: IProps) => {
  const { onSkadededelerChange, skadedeDeler } = props;
  const skadetKroppsdelkoder = props.kroppsdelKode;
  const skadetypekoder = props.skadeartKoder;

  const [injuriesForTable, setInjuriesForTable] = useState<SkadetDel[]>([]);
  const [skade, setSkade] = useState<SkadetDel>();

  const [kroppsdel, setKroppsdel] = useState<string>('');
  const [skadeart, setSkadeart] = useState<string>('');

  const handleMultipleInjuries = () => {
    setSkade(undefined);
    const skade: SkadetDel = {
      kroppsdelTabellD: kroppsdel,
      skadeartTabellC: skadeart
    };
    setKroppsdel('');
    setSkadeart('');
    setInjuriesForTable([...injuriesForTable, skade]);
  };

  const removeInjury = (index: number) => {
    const newInjuries = remove(index, 1, injuriesForTable);
    setInjuriesForTable(newInjuries);
  };

  useEffect(() => {
      if (skade) {
        onSkadededelerChange([...injuriesForTable, skade]);
      } else {
        onSkadededelerChange(injuriesForTable);
      }
  }, [injuriesForTable, setInjuriesForTable]);

  useEffect(() => {
    if (skadeart && skadeart.length > 0 && kroppsdel && kroppsdel.length > 0) {
      const skade: SkadetDel = {
        kroppsdelTabellD: kroppsdel,
        skadeartTabellC: skadeart
      }
      setSkade(skade);
      onSkadededelerChange([...injuriesForTable, skade]);
    } else {
      setSkade(undefined);
    }
  }, [skadeart, kroppsdel])

  useEffect(() => {
    if (skadedeDeler && skadedeDeler.length > 0) {
      const skader = skadedeDeler;
      const skade = skader[skader.length - 1];
      const resten = remove(skader.length - 1, 1, skader);
      setKroppsdel(skade.kroppsdelTabellD);
      setSkadeart(skade.skadeartTabellC);
      setInjuriesForTable(resten);
    }
  }, []);

  return (<>
    <Select
          className="spacer"
          label="Hvor på kroppen er skaden"
          value={kroppsdel}
          data-testid="injury-body-location-options"
          onChange={(e) => setKroppsdel(e.currentTarget.value)}
        >
          <option hidden value=""></option>
          { skadetKroppsdelkoder && Object.keys(skadetKroppsdelkoder).map((kode: string) => {
            return (
              <option key={kode} value={kode}>
                {skadetKroppsdelkoder[kode]?.verdi}
              </option>
            );
          })}
        </Select>

        <Select
          label="Hva slags skade er det"
          value={skadeart}
          className="spacer"
          data-testid="injury-type-options"
          onChange={(e) => setSkadeart(e.currentTarget.value)}
        >
          <option hidden value=""></option>
          { skadetypekoder && Object.keys(skadetypekoder).map(
            (kode: string) => {
              return (
                <option key={kode} value={kode}>
                  {skadetypekoder[kode]?.verdi}
                </option>
              );
            }
          )}
        </Select>

        <Button variant="tertiary" onClick={handleMultipleInjuries} data-testid="add-injury-button">
          <AddCircle />
          Legg til flere skader
        </Button>

        {injuriesForTable && injuriesForTable.length > 0 && (
          <Table className="spacer">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Område</Table.HeaderCell>
                <Table.HeaderCell>Skade</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {injuriesForTable.map(
                // (item: { damage?: string; bodypart?: string }, index: number) => {
                (item: SkadetDel, index: number) => {
                  return (
                    <Table.Row key={index}>
                      <Table.DataCell>{skadetKroppsdelkoder && skadetKroppsdelkoder[item.kroppsdelTabellD]?.verdi || 'UKJENT'}</Table.DataCell>
                      <Table.DataCell>{skadetypekoder && skadetypekoder[item.skadeartTabellC]?.verdi || 'UKJENT'}</Table.DataCell>
                      <Table.DataCell>
                        <Button
                          variant="tertiary"
                          data-testid="skade-tabell-fjern"
                          onClick={() => removeInjury(index)}
                        >
                          <MinusCircle />
                        </Button>
                      </Table.DataCell>
                    </Table.Row>
                  );
                }
              )}
            </Table.Body>
          </Table>
        )}
  </>)
}

export default SkadedeDeler;
