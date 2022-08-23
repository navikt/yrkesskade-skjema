/* eslint-disable react-hooks/exhaustive-deps */

import { Label } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { InputClassNames } from 'react-day-picker/types/ClassNames';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Periode } from '../../api/yrkesskade';
import { formatDate, handleDateValue } from '../../utils/date';
import { DateUtils } from 'react-day-picker';
import dateFnsParse from 'date-fns/parse';
import { isEmpty } from 'ramda';

interface IProps {
  onTidsperioderChange: (perioder: Periode) => void;
  periode: Periode | undefined;
}
const Tidsperiode = (props: IProps) => {
  const FORMAT: string = 'dd.MM.yyyy';
  const { onTidsperioderChange, periode } = props;

  const [toDayInput, setToDayInput] = useState<DayPickerInput | null>();
  const [specificFromDay, setSpecificFromDay] = useState<Date | undefined>();
  const [specificToDay, setSpecificToDay] = useState<Date | undefined>();

  useEffect(() => {
    if (!isEmpty(periode) && typeof periode !== 'undefined') {
      setSpecificFromDay(handleDateValue(periode.fra!));
      setSpecificToDay(handleDateValue(periode.til!));
    }
  }, []);

  useEffect(() => {
    if (
      specificFromDay &&
      DateUtils.isDate(specificFromDay) &&
      specificToDay &&
      DateUtils.isDate(specificToDay)
    ) {
      const periode: Periode = {
        fra: specificFromDay.toISOString(),
        til: specificToDay.toISOString(),
      };
      onTidsperioderChange(periode);
    }
  }, [specificFromDay, specificToDay]);

  const modifiers = { start: specificFromDay, end: specificToDay };

  const dayPickerClassNames = {
    container: 'nav-day-picker',
    overlay: '',
    overlayWrapper: '',
  } as InputClassNames;

  const fromDayPickerClassNames = {
    ...dayPickerClassNames,
    container: `service-from-date ${dayPickerClassNames.container}`,
  };

  const toDayPickerClassNames = {
    ...dayPickerClassNames,
    container: `service-to-date ${dayPickerClassNames.container}`,
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
              firstDayOfWeek: 1,
              toMonth: specificToDay,
              disabledDays: {
                after: new Date(),
              },
              modifiers,
              onDayClick: () => toDayInput?.getInput().focus(),
            }}
          />
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
              firstDayOfWeek: 1,
              month: specificFromDay,
              fromMonth: specificFromDay,
              disabledDays: { before: specificFromDay as Date },
              modifiers,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Tidsperiode;
