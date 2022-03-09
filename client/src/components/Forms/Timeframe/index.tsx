import { useState, useEffect } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Select, RadioGroup, Label } from '@navikt/ds-react';
import { useStateMachine } from 'little-state-machine';

import './timeframeForm.less';
import ulykkestid from '../../../assets/Lists/ulykkestid';

import { get } from 'lodash';

import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

function parseDate(str: string, format: string) {
  const parsed = dateFnsParse(str, format, new Date());
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date: number | Date, format: string) {
  return dateFnsFormat(date, format);
}

interface IProps {
  register: any;
  errors: any;
  setValue: any;
}
const TimeframeForm = ({ register, errors, setValue }: IProps) => {
  const FORMAT:string = 'dd.MM.yyyy';
  const { state } = useStateMachine();

  const [timeType, setTimeType] = useState(state.hendelsesfakta.tid.tidstype);
  const [specificDate, setSpecificDate] = useState<Date | undefined>(state.hendelsesfakta.tid.tidspunkt);

  const handleSpecificDate = (selectedDay: Date) => {
    setSpecificDate(selectedDay);
    setValue('hendelsesfakta.tid.tidspunkt', selectedDay);
  };

  let specificDateError = '';

  useEffect(() => {
    if(timeType === 'Tidspunkt' && typeof specificDate === undefined) {
      specificDateError = 'Dette feltet er påkrevd';
    }
  },[])

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
            <DayPickerInput
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
            {specificDateError?.length > 0 && (
              <span className="navds-error-message navds-error-message--medium navds-label">
                {specificDateError}
              </span>
            )}
          </div>
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
          <div>
            <Label>Dato for ulykken</Label>
            <DayPickerInput
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
            {specificDateError?.length > 0 && (
              <span className="navds-error-message navds-error-message--medium navds-label">
                {specificDateError}
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
