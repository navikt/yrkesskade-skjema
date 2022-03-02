import { useState } from 'react';
import { TextField, Label } from '@navikt/ds-react';
import { Controller } from 'react-hook-form';
import stillingstitler from '../../../assets/Lists/stillingstitler';
import Select from 'react-select';
import validator from '@navikt/fnrvalidator';
import { useInnloggetContext } from '../../../context/InnloggetContext';
import { useStateMachine } from 'little-state-machine';
import {isEmpty} from 'ramda';

import './Injured.less';

interface IProps {
  register: any;
  errors: any;
  control: any;
}
const InjuredForm = ({ register, errors, control }: IProps) => {
  const { innloggetBruker } = useInnloggetContext();
  const { state } = useStateMachine();
  const [openMenu, setOpenMenu] = useState(false);

  const handleInputChange = (query: string, action:any) => {
    if (action.action === 'input-change' && query.length >= 2) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  };
  return (
    <>
      <div>
        <Label>Hva er den skadeliteds stilling</Label>
        <Controller
          name="skadelidt.dekningsforhold.stillingstittelTilDenSkadelidte"
          control={control}
          rules={{ required:  isEmpty(state.skadelidt.dekningsforhold
            .stillingstittelTilDenSkadelidte) && 'Dette feltet er påkrevd'  }}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <Select
              defaultValue={{
                value:
                  state.skadelidt.dekningsforhold
                    .stillingstittelTilDenSkadelidte,
                label:
                  state.skadelidt.dekningsforhold
                    .stillingstittelTilDenSkadelidte,
              }}
              onBlur={onBlur}
              onChange={(val) => onChange([val?.value])}
              options={stillingstitler}
              menuIsOpen={openMenu}
              onInputChange={handleInputChange}
            />
          )}
        />
        {errors?.skadelidt?.dekningsforhold
          ?.stillingstittelTilDenSkadelidte && (
          <span className="navds-error-message navds-error-message--medium navds-label">
            {
              errors.skadelidt.dekningsforhold.stillingstittelTilDenSkadelidte
                .message
            }
          </span>
        )}
      </div>

      <TextField
        className="spacer fnr"
        {...register('skadelidt.norskIdentitetsnummer', {
          required: 'Dette feltet er påkrevd',
          minLength: 11,
          maxLength: 11,
          validate: (value: any) => {
            const validationResult: any = validator.idnr(value);
            if (validationResult.status === 'invalid') {
              return 'Fyll ut et gyldig fødselsnummer';
            } else if (value === innloggetBruker?.fnr) {
              return 'Fødselsnummer kan ikke være likt ditt eget';
            } else {
              return true;
            }
          },
        })}
        label="Fyll ut fødselsnummer på den skadelidte"
        type="number"
        error={
          errors?.skadelidt?.norskIdentitetsnummer &&
          errors.skadelidt.norskIdentitetsnummer.message
        }
        data-testid="injured-id-number"
      />
    </>
  );
};

export default InjuredForm;
