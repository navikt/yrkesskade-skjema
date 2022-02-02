import { TextField, Label } from '@navikt/ds-react';
import { Controller } from 'react-hook-form';
import stillingstitler from '../../../assets/stillingstitler';
import Select from 'react-select';
interface IProps {
  register: any;
  errors: any;
  setValue: (field: string, value: string) => void;
  control: any;
}
const InjuredForm = ({ register, errors, setValue, control }: IProps) => {
  return (
    <>
      <div>
        <Label>Hva er den skadeliteds rolle</Label>
        <Controller
          name="skadelidt.arbeidsforhold.stillingstittel"
          // isClearable
          control={control}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <Select
              onBlur={onBlur}
              onChange={(val) => onChange(val?.value)}
              options={stillingstitler}
            />
          )}
        />
      </div>

      <TextField
        className="spacer"
        {...register('skadelidt.foedselsnummer', {
          required: true,
          minLength: 11,
          maxLength: 11,
        })}
        label="Fyll ut fødselsnummer på den skadelidte"
        type="number"
        error={errors?.skadelidt?.foedselsnummer && 'Dette feltet er påkrevd'}
        data-testid="injured-id-number"
      />
    </>
  );
};

export default InjuredForm;
