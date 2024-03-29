/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-operators */
import { AddCircle, MinusCircle } from '@navikt/ds-icons';
import { Button, Select, Table, ReadMore, Label } from '@navikt/ds-react';
import { isEmpty } from 'lodash';
import { remove } from 'ramda';
import { useEffect, useState } from 'react';
import { KodeverdiDto } from '../../api/kodeverk';
import { SkadetDel } from '../../api/yrkesskade';
import { useAppDispatch } from '../../core/hooks/state.hooks';
import { fjernSkadetDel } from '../../core/reducers/skademelding.reducer';

interface IProps {
  onSkadededelerChange: (skadedeDeler: SkadetDel[]) => void;
  skadedeDeler: SkadetDel[];
  skadeartKoder: Record<string, KodeverdiDto | undefined> | undefined;
  kroppsdelKode: Record<string, KodeverdiDto | undefined> | undefined;
  sykdomstypeKoder: Record<string, KodeverdiDto | undefined> | undefined;
  periode: boolean;
}

const SkadedeDeler = (props: IProps) => {
  const { onSkadededelerChange, skadedeDeler } = props;
  const dispatch = useAppDispatch();
  const skadetKroppsdelkoder = props.kroppsdelKode;
  const skadetypekoder = props.skadeartKoder;
  const sykdomstypekoder = props.sykdomstypeKoder;

  const [injuriesForTable, setInjuriesForTable] = useState<SkadetDel[]>([]);
  const [skade, setSkade] = useState<SkadetDel>();

  const [kroppsdel, setKroppsdel] = useState<string>('');
  const [skadeart, setSkadeart] = useState<string>('');

  const [kroppsdelError, setKroppsdelError] = useState<string | undefined>();
  const [skadeartError, setSkadeartError] = useState<string | undefined>();

  const handleMultipleInjuries = () => {
    setKroppsdelError(undefined);
    setSkadeartError(undefined);
    if (isEmpty(skadeart) || isEmpty(kroppsdel)) {
      if (isEmpty(skadeart)) {
        setSkadeartError('Dette feltet er påkrevd');
      }

      if (isEmpty(kroppsdel)) {
        setKroppsdelError('Dette feltet er påkrevd');
      }
      return;
    }
    setSkade(undefined);
    const skade: SkadetDel = {
      kroppsdel: kroppsdel,
      skadeart: skadeart,
    };
    setKroppsdel('');
    setSkadeart('');
    setInjuriesForTable([...injuriesForTable, skade]);
  };

  const removeInjury = (index: number) => {
    const injury = injuriesForTable[index];
    const newInjuries = remove(index, 1, injuriesForTable);
    dispatch(fjernSkadetDel(injury));
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
        kroppsdel: kroppsdel,
        skadeart: skadeart,
      };
      setSkade(skade);
      onSkadededelerChange([...injuriesForTable, skade]);
    } else {
      setSkade(undefined);
    }
  }, [skadeart, kroppsdel]);

  useEffect(() => {
    if (skadedeDeler && skadedeDeler.length > 0) {
      const skader = skadedeDeler;
      const skade = skader[skader.length - 1];
      const resten = remove(skader.length - 1, 1, skader);
      setKroppsdel(skade.kroppsdel);
      setSkadeart(skade.skadeart);
      setInjuriesForTable(resten);
    }
  }, []);

  const sykdomSkadeKoder = { ...skadetypekoder, ...sykdomstypekoder };

  return (
    <>
      <Select
        label="Hva slags skade er det"
        value={skadeart}
        className="spacer"
        data-testid="injury-type-options"
        onChange={(e) => setSkadeart(e.currentTarget.value)}
        error={skadeartError}
      >
        <option hidden value=""></option>
        <optgroup label="SKADE">
          {skadetypekoder &&
            Object.keys(skadetypekoder).map((kode: string) => {
              return (
                <option key={kode} value={kode}>
                  {skadetypekoder[kode]?.verdi}
                </option>
              );
            })}
        </optgroup>
        {props.periode && (
          <optgroup label="SYKDOM">
            {sykdomstypekoder &&
              Object.keys(sykdomstypekoder).map((kode: string) => {
                return (
                  <option key={kode} value={kode}>
                    {sykdomstypekoder[kode]?.verdi}
                  </option>
                );
              })}
          </optgroup>
        )}
      </Select>

      <Label>Hvor på kroppen er skaden?</Label>
      {props.periode && (
        <ReadMore
          className=""
          size="medium"
          header="Grunnen til at vi spør om dette"
        >
          Ved enkelte sykdomstyper vil det være en hjelp å vite hvilken
          kroppsdel som er berørt. Dersom det ikke er naturlig å spesifisere
          hvor på kroppen sykdommen sitter, kan du velge alternativet «hele
          kroppen».
        </ReadMore>
      )}
      <Select
        className="spacer-bottom"
        label=""
        value={kroppsdel}
        data-testid="injury-body-location-options"
        onChange={(e) => setKroppsdel(e.currentTarget.value)}
        error={kroppsdelError}
      >
        <option hidden value=""></option>
        {skadetKroppsdelkoder &&
          Object.keys(skadetKroppsdelkoder).map((kode: string) => {
            return (
              <option key={kode} value={kode}>
                {skadetKroppsdelkoder[kode]?.verdi}
              </option>
            );
          })}
      </Select>

      <Button
        variant="tertiary"
        onClick={handleMultipleInjuries}
        data-testid="add-injury-button"
      >
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
                  <Table.Row key={index} data-testid="skadet-del-rad">
                    <Table.DataCell>
                      {(skadetKroppsdelkoder &&
                        skadetKroppsdelkoder[item.kroppsdel]?.verdi) ||
                        `UKJENT ${item.kroppsdel}`}
                    </Table.DataCell>
                    <Table.DataCell>
                      {(sykdomSkadeKoder &&
                        sykdomSkadeKoder[item.skadeart]?.verdi) ||
                        `UKJENT ${item.skadeart}`}
                    </Table.DataCell>
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
    </>
  );
};

export default SkadedeDeler;
