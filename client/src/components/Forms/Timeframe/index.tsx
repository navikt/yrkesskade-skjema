import { useState } from 'react';
import {
  Select,
  TextField,
  Fieldset,
  RadioGroup,
  Radio,
  Label,
} from '@navikt/ds-react';
import DatePicker, { registerLocale }from 'react-datepicker';
import nb from "date-fns/locale/nb"
import { Controller } from 'react-hook-form';

import './timeframeForm.less';

registerLocale("nb", nb);

interface IProps {
  register: any;
  errors: any;
  control: any;
}
const TimeframeForm = ({ register, errors, control }: IProps) => {
  const [timeframe, setTimeframe] = useState('');
  return (
    <>
      <Fieldset legend="Når skjedde ulykken som skal meldes?">
        <div className="spacer">
          <Label>Dato for ulykken</Label>
          <Controller
            name="hendelsesfakta.tid.dato"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="navds-text-field__input navds-body-short navds-body-medium"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                maxDate={new Date()}
                locale="nb"
                dateFormat="dd.MM.yyyy"
              />
            )}
          />
        </div>

        <TextField
          {...register('hendelsesfakta.tid.tidspunkt', { required: true })}
          error={
            errors?.hendelsesfakta?.tid?.tidspunkt && 'Dette feltet er påkrevd'
          }
          label="Klokkeslett for ulykken"
          description="00:00"
          data-testid="timeframe-when-time"
          // className="spacer"
        />

        <RadioGroup
          // className="spacer"
          legend
          error={
            errors?.hendelsesfakta?.tid?.ukjent && 'Dette feltet er påkrevd'
          }
        >
          <Radio
            {...register('hendelsesfakta.tid.ukjent')}
            value="Ukjent"
            data-testid="timeframe-when-unknown"
          >
            Ukjent
          </Radio>
          <Radio
            {...register('hendelsesfakta.tid.ukjent')}
            value="Over en periode"
            data-testid="timeframe-when-over-period"
          >
            Over en periode
          </Radio>
        </RadioGroup>
      </Fieldset>

      <Select
        className="spacer"
        {...register('hendelsesfakta.tid.tidstype', { required: true })}
        error={
          errors?.hendelsesfakta?.tid?.tidstype && 'Dette feltet er påkrevd'
        }
        onChange={(e) => {
          setTimeframe(e.target.value);
        }}
        label="Innenfor hvilket tidsrom inntraff skaden?"
        data-testid="timeframe-period-options"
      >
        <option value="">Velg</option>
        <option value="I avtalt arbeidstid">I avtalt arbeidstid</option>
        <option value="Under permisjon">Under permisjon</option>
        <option value="Under full sykemelding">Under full sykemelding</option>
        <option value="Fritid/ privat aktivitet">
          Fritid/ privat aktivitet
        </option>
        <option value="Hvilende vakt">Hvilende vakt</option>
        <option value="Under frivillig arbeid">Under frivillig arbeid</option>
        <option value="Under redningsarbeid, vakthold eller redningsøvelse">
          Under redningsarbeid, vakthold eller redningsøvelse
        </option>
        <option value="Annet" data-testid="timeframe-period-option-other">
          Annet
        </option>
      </Select>

      {timeframe === 'Annet' && (
        <TextField
          className="spacer"
          {...register('hendelsesfakta.tid.tidstypeAnnet')}
          error={
            errors?.hendelsesfakta?.tid?.tidstypeAnnet &&
            'Dette feltet er påkrevd'
          }
          label="Annet"
          data-testid="timeframe-period-option-other-text"
        />
      )}
    </>
  );
};

export default TimeframeForm;
