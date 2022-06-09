import { useState, useEffect, useRef } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Select, Label, ToggleGroup, BodyLong } from '@navikt/ds-react';
import { Datepicker, isISODateString } from '@navikt/ds-datepicker';
import InputMask from 'react-input-mask';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { Controller, useFormContext } from 'react-hook-form';
import {
  handleDateValue,
  handleTimeValue,
  isKlokkeslett,
} from '../../../utils/date';
import './Timeframe.less';
import { InputClassNames } from 'react-day-picker/types/ClassNames';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectKodeverk } from '../../../core/reducers/kodeverk.reducer';
import { selectSkademelding } from '../../../core/reducers/skademelding.reducer';
import { Skademelding, Tid } from '../../../api/yrkesskade';
import { nb } from 'date-fns/locale';

function formatDate(date: number | Date, format: string) {
  return dateFnsFormat(date, format);
}
const TimeframeForm = () => {
  const FORMAT: string = 'dd.MM.yyyy';
  const TIDSPUNKT_FORMAT: string = `${FORMAT} HH:mm`;

  const {
    register,
    formState: { errors },
    setValue,
    control,
  } = useFormContext<Skademelding>();

  const state = useAppSelector((state) => selectSkademelding(state));
  const tidsromkoder = useAppSelector((state) =>
    selectKodeverk(state, 'tidsrom')
  );

  const dayPickerClassNames = {
    container: 'nav-day-picker',
    overlay: '',
    overlayWrapper: '',
  } as InputClassNames;

  const whenDayPickerClassNames = {
    ...dayPickerClassNames,
    container: `timeframe-when-date ${dayPickerClassNames.container}`,
  };

  const fromDayPickerClassNames = {
    ...dayPickerClassNames,
    container: `timeframe-from-date ${dayPickerClassNames.container}`,
  };

  const toDayPickerClassNames = {
    ...dayPickerClassNames,
    container: `timeframe-to-date ${dayPickerClassNames.container}`,
  };

  const [timeType, setTimeType] = useState(state.hendelsesfakta?.tid.tidstype);
  const [specificDate, setSpecificDate] = useState<Date | undefined>(
    handleDateValue(state.hendelsesfakta?.tid.tidspunkt)
  );

  const [specificTime, setSpecificTime] = useState<string | undefined>(
    handleTimeValue(state.hendelsesfakta?.tid.tidspunkt)
  );

  const [toDayInput, setToDayInput] = useState<DayPickerInput | null>();
  const [specificFromDay, setSpecificFromDay] = useState<Date | undefined>(
    handleDateValue(state.hendelsesfakta?.tid.periode?.fra)
  );
  const [specificToDay, setSpecificToDay] = useState<Date | undefined>(
    handleDateValue(state.hendelsesfakta?.tid.periode?.til)
  );

  const modifiers = { start: specificFromDay, end: specificToDay };

  const handleSpecificDate = (selectedDay: Date) => {
    setSpecificDate(selectedDay);
  };

  const handleSpecificFromDay = (selectedDay: Date) => {
    setSpecificFromDay(selectedDay);
  };

  const handleSpecificToDay = (selectedDay: Date) => {
    setSpecificToDay(selectedDay);
  };

  const handleKlokkeChange = (event: any) => {
    setSpecificTime(event.target.value);
  };

  useEffect(() => {
    if (specificDate && specificTime && isKlokkeslett(specificTime)) {
      const dato = formatDate(specificDate, FORMAT);
      const tidspunkt = `${dato} ${specificTime}`;

      const isoDate = dateFnsParse(tidspunkt, TIDSPUNKT_FORMAT, new Date(), {
        locale: nb,
      }).toISOString();

      setValue('hendelsesfakta.tid.tidspunkt', isoDate);
    }
  }, [specificTime, specificDate, setValue, TIDSPUNKT_FORMAT]);

  useEffect(() => {
    if (timeType !== 'Periode') {
      return;
    }

    setValue('hendelsesfakta.tid.periode.fra', specificFromDay?.toISOString());
    setValue('hendelsesfakta.tid.periode.til', specificToDay?.toISOString());
  }, [timeType, specificFromDay, specificToDay, setValue]);

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

  const specificDateError = useRef('');

  useEffect(() => {
    if (timeType === 'Tidspunkt' && typeof specificDate === undefined) {
      specificDateError.current = 'Dette feltet er påkrevd';
    }
  }, [timeType, specificDate]);

  return (
    <>
      <ToggleGroup
        onChange={ (tidstype: any) => {setTimeType(tidstype);}}
        size="medium"
        value={timeType}
        label="Når skjedde ulykken som skal meldes?"
      >
        <ToggleGroup.Item value={Tid.tidstype.TIDSPUNKT}>
          På en dato
        </ToggleGroup.Item>
        <ToggleGroup.Item value={Tid.tidstype.PERIODE}>
          Over en periode
        </ToggleGroup.Item>
        <ToggleGroup.Item value={Tid.tidstype.UKJENT}>Ukjent</ToggleGroup.Item>
      </ToggleGroup>
      <div className="toggleGroup-content">
        {timeType === 'Tidspunkt' && (
          <div className="periode-container">
            <div className="dateTime-date spacer">
              <Label>Velg dato</Label>
              <Controller
                name="hendelsesfakta.tid.tidspunkt"
                control={control}
                rules={{
                  required:
                    // timeType === 'Tidspunkt' &&
                    // specificDate !== null &&
                    // specificDate?.getHours() === 0 &&
                    // specificDate?.getMinutes() === 0 &&
                    'Dette feltet er påkrevd',
                }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <DayPickerInput
                    classNames={{ ...whenDayPickerClassNames }}
                    placeholder="DD.MM.ÅÅÅÅ"
                    value={specificDate}
                    onDayChange={setSpecificDate}
                    formatDate={formatDate}
                    format={FORMAT}
                    parseDate={parseDate}
                    dayPickerProps={{
                      firstDayOfWeek: 1,
                      disabledDays: {
                        after: new Date(),
                      },
                    }}
                  />
                )}
              />

              {specificDateError.current?.length > 0 && (
                <span className="navds-error-message navds-error-message--medium navds-label">
                  {specificDateError.current}
                </span>
              )}
            </div>

            {timeType === 'Tidspunkt' && specificDate !== null && (
              <div className="dateTime-time spacer">
                <Label>klokkeslett</Label>
                {/* <label htmlFor="timeframe-when-time" className="navds-label">
                Tid for ulykken
              </label> */}
                <InputMask
                  mask="99:99"
                  placeholder="00:00"
                  onChange={handleKlokkeChange}
                  value={specificTime || ''}
                  data-testid="timeframe-when-time"
                  id="timeframe-when-time"
                  className="navds-text-field__input navds-body-short navds-body-medium"
                />
                {errors?.hendelsesfakta?.tid?.tidspunkt && (
                  <span className="navds-error-message navds-error-message--medium navds-label">
                    {errors?.hendelsesfakta?.tid?.tidspunkt?.message}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {timeType === 'Periode' && (
          <div className="periode-container spacer">
            <div>
              <Label>Fra dag</Label>
              <Controller
                name="hendelsesfakta.tid.periode.fra"
                control={control}
                rules={{
                  required:
                    timeType === 'Periode' &&
                    specificFromDay !== null &&
                    'Dette feltet er påkrevd',
                }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <DayPickerInput
                    classNames={fromDayPickerClassNames}
                    placeholder=""
                    value={specificFromDay}
                    onDayChange={handleSpecificFromDay}
                    formatDate={formatDate}
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
                )}
              />
              {errors?.hendelsesfakta?.tid?.periode?.fra &&
                errors?.hendelsesfakta?.tid?.periode?.fra?.message && (
                  <span className="navds-error-message navds-error-message--medium navds-label">
                    Fra dato er påkrevd
                  </span>
                )}
            </div>
            <div>
              <Label>Til dag</Label>
              <Controller
                name="hendelsesfakta.tid.periode.til"
                control={control}
                rules={{
                  required:
                    timeType === 'Periode' &&
                    specificToDay !== null &&
                    'Dette feltet er påkrevd',
                }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <DayPickerInput
                    ref={(el) => setToDayInput(el)}
                    classNames={toDayPickerClassNames}
                    placeholder=""
                    value={specificToDay}
                    onDayChange={handleSpecificToDay}
                    formatDate={formatDate}
                    format={FORMAT}
                    parseDate={parseDate}
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
                )}
              />
              {errors?.hendelsesfakta?.tid?.periode?.til &&
                errors?.hendelsesfakta?.tid?.periode?.til?.message && (
                  <span className="navds-error-message navds-error-message--medium navds-label">
                    Til dato er påkrevd
                  </span>
                )}
            </div>
          </div>
        )}

        {timeType === 'Ukjent' && (
          <BodyLong className="spacer">
            Husk å skrive utfyllende om dette i beskrivende felt på slutten av
            innmeldingen. For å melde yrkessykdom må vi ha en periode.
          </BodyLong>
        )}
      </div>

      <Select
        className="spacer"
        {...register('hendelsesfakta.naarSkjeddeUlykken', {
          required: 'Dette feltet er påkrevd',
        })}
        error={
          errors?.hendelsesfakta?.naarSkjeddeUlykken &&
          errors?.hendelsesfakta?.naarSkjeddeUlykken.message
        }
        label="Innenfor hvilket tidsrom inntraff skaden?"
        data-testid="timeframe-period-options"
      >
        <option hidden value=""></option>
        {tidsromkoder &&
          Object.keys(tidsromkoder).map(
            (tidsromkode: string, index: number) => {
              return (
                <option
                  key={encodeURIComponent(tidsromkode)}
                  value={tidsromkode}
                >
                  {tidsromkoder[tidsromkode]?.verdi}
                </option>
              );
            }
          )}
      </Select>
    </>
  );
};
export default TimeframeForm;
