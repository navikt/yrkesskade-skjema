import { useState } from 'react';
import { Select, RadioGroup, Label } from '@navikt/ds-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useStateMachine } from 'little-state-machine';
import nb from 'date-fns/locale/nb';
import { Controller } from 'react-hook-form';
import { path } from 'ramda';

import './timeframeForm.less';
import ulykkestid from '../../../assets/Lists/ulykkestid';
import { parseISO } from 'date-fns';

registerLocale('nb', nb);

interface IProps {
  register: any;
  errors: any;
  control: any;
  setValue: any;
}
const TimeframeForm = ({ register, errors, control, setValue }: IProps) => {
  const { state } = useStateMachine();
  const [timeType, setTimeType] = useState(state.hendelsesfakta.tid.tidstype);

  const [specificDate, setSpecificDate] = useState<Date | null>(
    typeof path(['hendelsesfakta', 'tid', 'tidspunkt'], state) === 'string'
      ? parseISO(state.hendelsesfakta.tid.tidspunkt + '')
      : null
  );
  const [startDateRange, setStartDateRange] = useState<Date | null>(
    typeof path(['hendelsesfakta', 'tid', 'periode', 'fra'], state) === 'string'
      ? parseISO(path(['hendelsesfakta', 'tid', 'periode', 'fra'], state) + '')
      : null
  );
  const [endDateRange, setEndDateRange] = useState<Date | null>(
    typeof path(['hendelsesfakta', 'tid', 'periode', 'til'], state) === 'string'
      ? parseISO(path(['hendelsesfakta', 'tid', 'periode', 'til'], state) + '')
      : null
  );

  const onChangeRange = (dates: (Date | null)[]) => {
    const [startRange, endRange] = dates;
    setStartDateRange(startRange);
    setValue('hendelsesfakta.tid.periode.fra', startRange);
    setValue('hendelsesfakta.tid.periode.til', endRange);
    setEndDateRange(endRange);
  };
  const onChangeSpecificDate = (date: Date | null) => {
    setSpecificDate(date);
    setValue('hendelsesfakta.tid.tidspunkt', date);
  };
  return (
    <>
      <RadioGroup
        // className="spacer"
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
          <div className="spacer">
            <Label>Dato for ulykken</Label>
            <Controller
              name="hendelsesfakta.tid.tidspunkt"
              control={control}
              rules={{
                required:
                  timeType === 'Tidspunkt' &&
                  specificDate === null &&
                  'Dette feltet er påkrevd',
              }}
              render={({ field }) => (
                <DatePicker
                  className="navds-text-field__input navds-body-short navds-body-medium"
                  onChange={onChangeSpecificDate}
                  selected={specificDate}
                  maxDate={new Date()}
                  locale="nb"
                  dateFormat={["dd.MM.yyyy", "ddMMyyyy", "ddMMyy"]}
                  showTimeInput
                  shouldCloseOnSelect={false}
                />
              )}
            />
            {errors?.hendelsesfakta?.tid?.tidspunkt && (
              <span className="navds-error-message navds-error-message--medium navds-label">
                {errors?.hendelsesfakta?.tid?.tidspunkt.message}
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
        </div>

        {timeType === 'Periode' && (
          <div className="spacer">
            <Label>Fra - Til</Label>
            <Controller
              name="periode"
              control={control}
              rules={{
                required:
                  timeType === 'Periode' &&
                  startDateRange === null &&
                  endDateRange === null &&
                  'Dette feltet er påkrevd',
              }}
              render={({ field }) => (
                <DatePicker
                  className="navds-text-field__input navds-body-short navds-body-medium"
                  maxDate={new Date()}
                  locale="nb"
                  dateFormat={["dd.MM.yyyy", "ddMMyyyy", "ddMMyy"]}
                  selectsRange
                  selected={startDateRange}
                  onChange={onChangeRange}
                  startDate={startDateRange}
                  endDate={endDateRange}
                  shouldCloseOnSelect={false}
                />
              )}
            />
            {errors?.hendelsesfakta?.tid?.periode && (
              <span className="navds-error-message navds-error-message--medium navds-label">
                {errors?.hendelsesfakta?.tid?.periode.message}
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
