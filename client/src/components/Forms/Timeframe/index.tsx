import { useState, useEffect, useRef } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Select, RadioGroup, Label, TextField } from '@navikt/ds-react';
import { useStateMachine } from 'little-state-machine';

import ulykkestid from '../../../assets/Lists/ulykkestid';

import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { Controller } from 'react-hook-form';
import { handleDateValue, handleTimeValue } from '../../../utils/date';
import './Timeframe.less';
import { InputClassNames } from 'react-day-picker/types/ClassNames';

function formatDate(date: number | Date, format: string) {
  return dateFnsFormat(date, format);
}
interface IProps {
  register: any;
  errors: any;
  setValue: any;
  control: any;
}
const TimeframeForm = ({ register, errors, control, setValue }: IProps) => {
  const FORMAT: string = 'dd.MM.yyyy';
  const { state } = useStateMachine();

  const dayPickerClassNames = {
    container: 'nav-day-picker',
    overlay: '',
    overlayWrapper: ''
  } as InputClassNames;

  const whenDayPickerClassNames = { ...dayPickerClassNames,
    container: `timeframe-when-date ${dayPickerClassNames.container}`
  }

  const fromDayPickerClassNames = { ...dayPickerClassNames,
    container: `timeframe-from-date ${dayPickerClassNames.container}`
  }

  const toDayPickerClassNames = { ...dayPickerClassNames,
    container: `timeframe-from-date ${dayPickerClassNames.container}`
  }

  const [timeType, setTimeType] = useState(state.hendelsesfakta.tid.tidstype);
  const [specificDate, setSpecificDate] = useState<Date | undefined>(
    handleDateValue(state.hendelsesfakta.tid.tidspunkt)
  );

  const [specificTime, setSpecificTime] = useState<string | undefined>(
    handleTimeValue(state.hendelsesfakta.tid.tidspunkt)
  )

  const [ toDayInput, setToDayInput ] = useState<DayPickerInput | null>();
  const [ specificFromDay, setSpecificFromDay ] = useState<Date | undefined>(
    handleDateValue(state.hendelsesfakta.tid.periode.fra)
  );
  const [specificToDay, setSpecificToDay] = useState<Date | undefined>(
    handleDateValue(state.hendelsesfakta.tid.periode.til)
  );

  const modifiers = { start: specificFromDay, end: specificToDay};

  const handleSpecificDate = (selectedDay: Date) => {
    setSpecificDate(selectedDay);
  };

  const handleSpecificFromDay = (selectedDay: Date) => {
    setSpecificFromDay(selectedDay);
  }

  const handleSpecificToDay = (selectedDay: Date) => {
    setSpecificToDay(selectedDay);
  }

  const handleKlokkeChange = (event: any) => {
    setSpecificTime(event.target.value);
  }

  useEffect(() => {
    if (specificDate && specificTime && specificTime.length === 5) {
      const timeparts = specificTime.split(':');
      const newDate = new Date(
        specificDate.getUTCFullYear(),
        specificDate?.getUTCMonth(), specificDate?.getUTCDay(),
        parseInt(timeparts[0]),
        parseInt(timeparts[1]));

        setValue('hendelsesfakta.tid.tidspunkt', newDate);
    }

  }, [specificTime, specificDate, setValue]);

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
  }

  const specificDateError = useRef('');
  let specificRangeError = '';

  useEffect(() => {
    if (timeType === 'Tidspunkt' && typeof specificDate === undefined) {
      specificDateError.current = 'Dette feltet er påkrevd';
    }
  }, [timeType, specificDate]);

  return (
    <>
      <RadioGroup
        legend="Når skjedde ulykken som skal meldes?"
        error={
          errors?.hendelsesfakta?.tid?.tidstype &&
          errors?.hendelsesfakta?.tid?.tidstype.message
        }
      >
        <div className="navds-radio navds-radio--medium">
          <input
            type="radio"
            className="navds-radio__input"
            {...register('hendelsesfakta.tid.tidstype', {
              required: 'Dette feltet er påkrevd',
            })}
            value="Tidspunkt"
            data-testid="timeframe-when-date"
            id="timeframe-when-date"
            onChange={(e) => {
              setTimeType(e.target.value);
            }}
          />
          <label htmlFor="timeframe-when-date" className="navds-radio__label">
            På en dato
          </label>
        </div>

        {timeType === 'Tidspunkt' && (
          <div>
            <Label>Dato for ulykken</Label>
            <Controller
              name="hendelsesfakta.tid.tidspunkt"
              control={control}
              rules={{
                required:
                  timeType === 'Tidspunkt' &&
                  specificDate !== null &&
                  specificDate?.getHours() === 0 &&
                  specificDate?.getMinutes() === 0 &&
                  'Dette feltet er påkrevd',
              }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <DayPickerInput
                  classNames={ { ...whenDayPickerClassNames } }
                  placeholder=""
                  value={specificDate}
                  onDayChange={handleSpecificDate}
                  formatDate={formatDate}
                  format={FORMAT}
                  parseDate={parseDate}
                  dayPickerProps={{
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
        )}

          {timeType === 'Tidspunkt' && specificDate !== null && (
                <TextField
                  label="Tid for ulykken"
                      className="spacer"
                      onChange={handleKlokkeChange}
                      value={specificTime || ''}
                      error={
                        errors?.hendelsesfakta?.tid?.tidspunktTime &&
                        errors?.hendelsesfakta?.tid?.tidspunktTime.message
                      }
                      data-testid="timeframe-when-time"
                    />

            )}

        <div className="navds-radio navds-radio--medium">
          <input
            type="radio"
            className="navds-radio__input"
            {...register('hendelsesfakta.tid.tidstype', {
              required: 'Dette feltet er påkrevd',
            })}
            value="Periode"
            data-testid="timeframe-when-over-period"
            id="timeframe-when-over-period"
            onChange={(e) => {
              setTimeType(e.target.value);
            }}
          />
          <label
            htmlFor="timeframe-when-over-period"
            className="navds-radio__label"
          >
            Over en periode
          </label>
          {timeType === 'Periode' && (
            <div className="periode-container spacer">
              <div>
              <Label>Fra dag</Label>
              <DayPickerInput
                classNames={ fromDayPickerClassNames }
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
                  onDayClick: () => (toDayInput?.getInput().focus()),
                }}
              />
              </div>
              <div>
              <Label>Til dag</Label>
              <DayPickerInput
                ref={ el => (setToDayInput(el))}
                classNames={ toDayPickerClassNames }
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
                  },
                }}
              />
              </div>

              {specificRangeError?.length > 0 && (
                <span className="navds-error-message navds-error-message--medium navds-label">
                  {specificRangeError}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="navds-radio navds-radio--medium">
          <input
            type="radio"
            className="navds-radio__input"
            {...register('hendelsesfakta.tid.tidstype', {
              required: 'Dette feltet er påkrevd',
            })}
            value="Ukjent"
            data-testid="timeframe-when-unknown"
            id="timeframe-when-unknown"
            onChange={(e) => {
              setTimeType(e.target.value);
            }}
          />
          <label
            htmlFor="timeframe-when-unknown"
            className="navds-radio__label"
          >
            Ukjent
          </label>
        </div>
      </RadioGroup>
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
        {ulykkestid.map((time: { value: string; label: string }) => {
          return (
            <option key={encodeURIComponent(time.value)} value={time.value}>
              {time.label}
            </option>
          );
        })}
      </Select>
    </>
  );
};
export default TimeframeForm;

// import { useState } from 'react';
// import { Select, RadioGroup, Label } from '@navikt/ds-react';
// import DatePicker, { registerLocale } from 'react-datepicker';
// import { useStateMachine } from 'little-state-machine';
// import nb from 'date-fns/locale/nb';
// // import { path } from 'ramda';
// import { get } from 'lodash';

// import './timeframeForm.less';
// import ulykkestid from '../../../assets/Lists/ulykkestid';
// import { parseISO } from 'date-fns';

// registerLocale('nb', nb);
// interface IProps {
//   register: any;
//   errors: any;
//   setValue: any;
// }
// const TimeframeForm = ({ register, errors, setValue }: IProps) => {
//   const { state } = useStateMachine();
//   const [timeType, setTimeType] = useState(state.hendelsesfakta.tid.tidstype);

//   // const [specificDate, setSpecificDate] = useState<Date | null>(
//   //   typeof path(['hendelsesfakta', 'tid', 'tidspunkt'], state) === 'string'
//   //     ? parseISO(state.hendelsesfakta.tid.tidspunkt + '')
//   //     : null
//   // );
//     // const [specificDate, setSpecificDate] = useState<Date | undefined>(
//     const [specificDate, setSpecificDate] = useState<any>(
//     get(state, 'hendelsesfakta.tid.tidspunkt')
//   );
//   // const [startDateRange, setStartDateRange] = useState<Date | null>(
//   //   typeof path(['hendelsesfakta', 'tid', 'periode', 'fra'], state) === 'string'
//   //     ? parseISO(path(['hendelsesfakta', 'tid', 'periode', 'fra'], state) + '')
//   //     : null
//   // );
//   // const [endDateRange, setEndDateRange] = useState<Date | null>(
//   //   typeof path(['hendelsesfakta', 'tid', 'periode', 'til'], state) === 'string'
//   //     ? parseISO(path(['hendelsesfakta', 'tid', 'periode', 'til'], state) + '')
//   //     : null
//   // );

//   // const onChangeRange = (dates: (Date | null)[]) => {
//   //   const [startRange, endRange] = dates;
//   //   setStartDateRange(startRange);
//   //   setValue('hendelsesfakta.tid.periode.fra', startRange?.toISOString());
//   //   setValue('hendelsesfakta.tid.periode.til', endRange?.toString());
//   //   setEndDateRange(endRange);
//   // };

//   const onChangeSpecificDate = (date: any) => {
//     console.log(date);
//     setSpecificDate(date);
//     setValue('hendelsesfakta.tid.tidspunkt', date?.toISOString());
//   };
//   return (
//     <>
//       <RadioGroup
//         legend="Når skjedde ulykken som skal meldes?"
//         error={
//           errors?.hendelsesfakta?.tid?.tidstype &&
//           errors?.hendelsesfakta?.tid?.tidstype.message
//         }
//       >
//         <div className="navds-radio navds-radio--medium">
//           <input
//             type="radio"
//             className="navds-radio__input"
//             {...register('hendelsesfakta.tid.tidstype', {
//               required: 'Dette feltet er påkrevd',
//             })}
//             value="Tidspunkt"
//             data-testid="timeframe-when-date"
//             id="timeframe-when-date"
//             onChange={(e) => {
//               setTimeType(e.target.value);
//             }}
//           />
//           <label htmlFor="timeframe-when-date" className="navds-radio__label">
//             På en dato
//           </label>
//         </div>
//         {timeType === 'Tidspunkt' && (
//           <div>
//                 <DatePicker
//                   className="navds-text-field__input navds-body-short navds-body-medium timeframe-when-date"
//                   onChange={onChangeSpecificDate}
//                   selected={parseISO(specificDate)}
//                   maxDate={new Date()}
//                   locale="nb"
//                   dateFormat={['dd.MM.yyyy', 'ddMMyyyy', 'ddMMyy']}
//                   // shouldCloseOnSelect={false}
//                   data-testid="timeframe-when-date"
//                 />
//             {errors?.hendelsesfakta?.tid?.tidspunkt && (
//               <span className="navds-error-message navds-error-message--medium navds-label">
//                 {errors?.hendelsesfakta?.tid?.tidspunkt.message}
//               </span>
//             )}

//               <div className="spacer">
//                 <Label>Tid for ulykken</Label>
//                     <DatePicker
//                       className="navds-text-field__input navds-body-short navds-body-medium timeframe-when-time"
//                       onChange={onChangeSpecificDate}
//                       selected={specificDate}
//                       maxDate={new Date()}
//                       locale="nb"
//                       shouldCloseOnSelect={false}
//                       showTimeSelect
//                       showTimeSelectOnly
//                       timeIntervals={15}
//                       timeCaption="Time"
//                       dateFormat="HH:mm"
//                     />
//                 {errors?.hendelsesfakta?.tid?.tidspunktTime && (
//                   <span className="navds-error-message navds-error-message--medium navds-label">
//                     {errors?.hendelsesfakta?.tid?.tidspunktTime.message}
//                   </span>
//                 )}
//               </div>
//           </div>
//         )}

//         <div className="navds-radio navds-radio--medium">
//           <input
//             type="radio"
//             className="navds-radio__input"
//             {...register('hendelsesfakta.tid.tidstype', {
//               required: 'Dette feltet er påkrevd',
//             })}
//             value="Periode"
//             data-testid="timeframe-when-over-period"
//             id="timeframe-when-over-period"
//             onChange={(e) => {
//               setTimeType(e.target.value);
//             }}
//           />
//           <label
//             htmlFor="timeframe-when-over-period"
//             className="navds-radio__label"
//           >
//             Over en periode
//           </label>
//         </div>

//         {/* {timeType === 'Periode' && (
//           <div className="spacer">
//             <Label>Fra - Til</Label>

//                 <DatePicker
//                   className="navds-text-field__input navds-body-short navds-body-medium"
//                   maxDate={new Date()}
//                   locale="nb"
//                   dateFormat={['dd.MM.yyyy', 'ddMMyyyy', 'ddMMyy']}
//                   selectsRange
//                   selected={startDateRange}
//                   onChange={onChangeRange}
//                   startDate={startDateRange}
//                   endDate={endDateRange}
//                   shouldCloseOnSelect={false}
//                 />
//             {errors?.hendelsesfakta?.tid?.periode && (
//               <span className="navds-error-message navds-error-message--medium navds-label">
//                 {errors?.hendelsesfakta?.tid?.periode.message}
//               </span>
//             )}
//           </div>
//         )} */}

//         <div className="navds-radio navds-radio--medium">
//           <input
//             type="radio"
//             className="navds-radio__input"
//             {...register('hendelsesfakta.tid.tidstype', {
//               required: 'Dette feltet er påkrevd',
//             })}
//             value="Ukjent"
//             data-testid="timeframe-when-unknown"
//             id="timeframe-when-unknown"
//             onChange={(e) => {
//               setTimeType(e.target.value);
//             }}
//           />
//           <label
//             htmlFor="timeframe-when-unknown"
//             className="navds-radio__label"
//           >
//             Ukjent
//           </label>
//         </div>
//       </RadioGroup>

//       <Select
//         className="spacer"
//         {...register('hendelsesfakta.naarSkjeddeUlykken', {
//           required: 'Dette feltet er påkrevd',
//         })}
//         error={
//           errors?.hendelsesfakta?.naarSkjeddeUlykken &&
//           errors?.hendelsesfakta?.naarSkjeddeUlykken.message
//         }
//         label="Innenfor hvilket tidsrom inntraff skaden?"
//         data-testid="timeframe-period-options"
//       >
//         <option hidden value=""></option>
//         {ulykkestid.map((time: { value: string; label: string }) => {
//           return (
//             <option key={encodeURIComponent(time.value)} value={time.value}>
//               {time.label}
//             </option>
//           );
//         })}
//       </Select>
//     </>
//   );
// };

// export default TimeframeForm;
