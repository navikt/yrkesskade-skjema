/* eslint-disable react-hooks/exhaustive-deps */

import { Button, Label, Table } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { InputClassNames } from 'react-day-picker/types/ClassNames';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Periode } from '../../api/yrkesskade';
import { formatDate, handleDateValue } from '../../utils/date';
import { DateUtils } from 'react-day-picker';
import dateFnsParse from 'date-fns/parse';
import { AddCircle, MinusCircle } from '@navikt/ds-icons';
import { remove } from 'ramda';
import { isEmpty } from 'lodash';
import { fjernPeriode } from '../../core/reducers/skademelding.reducer';
import { useAppDispatch } from '../../core/hooks/state.hooks';
import { parseISO } from 'date-fns';

interface IProps {
  onTidsperioderChange: (perioder: Periode[]) => void;
  perioder: Periode[];
}
const Tidsperioder = (props: IProps) => {
  const FORMAT: string = 'dd.MM.yyyy';
  const dispatch = useAppDispatch();
  const { onTidsperioderChange, perioder } = props;

  const [perioderForTable, setPerioderForTable] = useState<Periode[]>([]);
  const [periode, setPeriode] = useState<Periode>();

  const [toDayInput, setToDayInput] = useState<DayPickerInput | null>();
  const [specificFromDay, setSpecificFromDay] = useState<Date | undefined>();
  const [specificToDay, setSpecificToDay] = useState<Date | undefined>();
  const [fraDatoError, setFraDatoError] = useState<string | undefined>();
  const [tilDatoError, setTilDatoError] = useState<string | undefined>();

  const handleMultipleTimeperiods = () => {
    // gjør validering
    setFraDatoError(undefined);
    setTilDatoError(undefined);
    if (isEmpty(specificFromDay) || !specificFromDay) {
      setFraDatoError('Dette feltet er påkrevd');
    }
    if (!DateUtils.isDate(specificFromDay!)) {
      setFraDatoError('Fra dato er ikke gyldig dato');
    }

    if (isEmpty(specificToDay) || !specificToDay) {
      setFraDatoError('Dette feltet er påkrevd');
    }
    if (!DateUtils.isDate(specificToDay!)) {
      setFraDatoError('Til dato er ikke gyldig dato');
    }

    if (specificFromDay! > specificToDay!) {
      setFraDatoError('Fra dato må være før til dato');
    }

    if (!specificToDay) {
      console.log('specificToDay er ikke satt');
      return;
    }
    if (!specificFromDay) {
      console.log('specificFromDay er ikke satt');
      return;
    }
    // opprett periode objekt
    setPeriode(undefined);
    const periode: Periode = {
      fra: specificFromDay.toISOString(),
      til: specificToDay.toISOString(),
    };
    // legg til tabell
    setSpecificToDay(undefined);
    setSpecificFromDay(undefined);
    setPerioderForTable([...perioderForTable, periode]);
  };

  const removePeriod = (index: number) => {
    const period = perioderForTable[index];
    const newPeriods = remove(index, 1, perioderForTable);
    dispatch(fjernPeriode(period));
    setPerioderForTable(newPeriods);
  };

  useEffect(() => {
    if (periode) {
      onTidsperioderChange([...perioderForTable, periode]);
    } else {
      onTidsperioderChange(perioderForTable);
    }
  }, [perioderForTable, setPerioderForTable]);

  useEffect(() => {
    if (specificFromDay && DateUtils.isDate(specificFromDay) && specificToDay && DateUtils.isDate(specificToDay)) {
      const periode: Periode = {
        fra: specificFromDay.toISOString(),
        til: specificToDay.toISOString(),
      };
      setPeriode(periode);
      onTidsperioderChange([...perioderForTable, periode]);
    } else {
      setPeriode(undefined);
    }
  }, [specificFromDay, specificToDay]);

  useEffect(() => {
    if (perioder && perioder.length > 0) {
      const nyPeriodeListe = perioder;
      const sistePeriode = nyPeriodeListe[nyPeriodeListe.length - 1];
      const resten = remove(nyPeriodeListe.length - 1, 1, nyPeriodeListe);
      setSpecificFromDay(handleDateValue(sistePeriode.fra!));
      setSpecificToDay(handleDateValue(sistePeriode.til!));
      setPerioderForTable(resten);
    }
  }, [])

  const modifiers = { start: specificFromDay, end: specificToDay };

  const dayPickerClassNames = {
    container: 'nav-day-picker',
    overlay: '',
    overlayWrapper: '',
  } as InputClassNames;

  const fromDayPickerClassNames = {
    ...dayPickerClassNames,
    container: `timeframe-from-date ${dayPickerClassNames.container}`,
  };

  const toDayPickerClassNames = {
    ...dayPickerClassNames,
    container: `timeframe-to-date ${dayPickerClassNames.container}`,
  };

  const parseDate = (str: string, format: string) => {
    // sjekk at vi har skrevet noe og at noe er 10 tegn
    if (!str || str.length !== 10) {
      return undefined;
    }

    // parse noe til dato om mulig
    const parsed = dateFnsParse(str, format, new Date());
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }

    // ikke dato
    return undefined;
  };

  const handleSpecificFromDay = (selectedDay: Date) => {
    setSpecificFromDay(selectedDay);
  };

  const handleSpecificToDay = (selectedDay: Date) => {
    setSpecificToDay(selectedDay);
  };

  return (
    <>
      <div className="periode-container spacer">
        <div>
          <Label>Fra dag</Label>

          <DayPickerInput
            classNames={fromDayPickerClassNames}
            placeholder=""
            value={specificFromDay}
            formatDate={formatDate}
            onDayChange={handleSpecificFromDay}
            format={FORMAT}
            parseDate={parseDate}
            dayPickerProps={{
              toMonth: specificToDay,
              disabledDays: {
                after: new Date(),
              },
              modifiers,
              onDayClick: () => toDayInput?.getInput().focus(),
            }}
          />
          {fraDatoError && (
            <span className="navds-error-message navds-error-message--medium navds-label">
              {fraDatoError}
            </span>
          )}
        </div>
        <div>
          <Label>Til dag</Label>
          <DayPickerInput
            ref={(el) => setToDayInput(el)}
            classNames={toDayPickerClassNames}
            placeholder=""
            value={specificToDay}
            onDayChange={handleSpecificToDay}
            parseDate={parseDate}
            formatDate={formatDate}
            format={FORMAT}
            dayPickerProps={{
              month: specificFromDay,
              fromMonth: specificFromDay,
              modifiers,
              disabledDays: {
                after: new Date(),
                before: specificFromDay,
              },
            }}
          />
          {tilDatoError && (
            <span className="navds-error-message navds-error-message--medium navds-label">
              {tilDatoError}
            </span>
          )}
        </div>
      </div>
      <div>
        <Button
          variant="tertiary"
          onClick={handleMultipleTimeperiods}
          data-testid="add-period-button"
        >
          <AddCircle />
          Legg til periode
        </Button>
      </div>
      {perioderForTable && perioderForTable.length > 0 && (
        <Table className="spacer">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Fra</Table.HeaderCell>
              <Table.HeaderCell>Til</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {perioderForTable.map((periode: Periode, index: number) => (
              <Table.Row key={index} data-testid="periode-rad">
                <Table.DataCell>{formatDate(parseISO(periode.fra!), FORMAT)}</Table.DataCell>
                <Table.DataCell>{formatDate(parseISO(periode.til!), FORMAT)}</Table.DataCell>
                <Table.DataCell>
                  <Button
                    variant="tertiary"
                    data-testid="periode-tabell-fjern"
                    onClick={() => removePeriod(index)}
                  >
                    <MinusCircle />
                  </Button>
                </Table.DataCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
};

export default Tidsperioder;
