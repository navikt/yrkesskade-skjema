import { useState, useEffect } from 'react';
import { TextField, Label, Select as NAVSelect } from '@navikt/ds-react';
import { Controller } from 'react-hook-form';
import stillingstitler from '../../../assets/Lists/stillingstitler';
import dekningsforhold from '../../../assets/Lists/dekningsforhold';
import Select from 'react-select';
import validator from '@navikt/fnrvalidator';
import { useInnloggetContext } from '../../../context/InnloggetContext';
import { useStateMachine } from 'little-state-machine';
import _ from 'lodash';

import {isFieldHidden, isFieldMandatory} from '../../../utils/feltStyring';

import './Injured.less';

interface IProps {
  register: any;
  errors: any;
  control: any;
  setValue: any;
}
const InjuredForm = ({ register, errors, control, setValue }: IProps) => {
  const { innloggetBruker } = useInnloggetContext();
  const { state } = useStateMachine();
  const [openMenu, setOpenMenu] = useState(false);

  const [rolletype, setRolletype] = useState(
    state.skadelidt.dekningsforhold.rolletype
  );

  // Åpner stillingsinputen når det er skrevet 2 eller fler tegn
  const handleInputChange = (query: string, action: any) => {
    if (action.action === 'input-change' && query.length >= 2) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  };

  // useEffect(() => {
  //   if(rolletype.toLowerCase() === 'elev' ) {
  //     setValue('skadelidt.dekningsforhold.stillingstittelTilDenSkadelidte', 'N/A');
  //   }
  // }, [rolletype, setValue]);


  // feltroller blacklist
  const fnrfelt = [];
  const tilknytning = [];
  const stilling = ['elev'];

  return (
    <>
      <TextField
        className="fnr"
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

      <NAVSelect
        className="spacer"
        label="Hva er den skadeliteds tilknytning til virksomheten?"
        {...register('skadelidt.dekningsforhold.rolletype', {
          required: 'Dette feltet er påkrevd',
        })}
        data-testid="injured-role-select"
        onChange={(e) => {
          setRolletype(e.target.value);
        }}
        error={
          errors?.skadelidt?.dekningsforhold?.rolletype &&
          errors?.skadelidt?.dekningsforhold.rolletype.message
        }
      >
        <option hidden value=""></option>
        {dekningsforhold.map((dekning: { value: string; label: string }) => {
          return (
            <option key={encodeURI(dekning.value)} value={dekning.value}>
              {dekning.label}
            </option>
          );
        })}
      </NAVSelect>
      {isFieldHidden(stilling, rolletype) && (
        <div className="spacer">
          <Label>Hva er den skadelidtes stilling</Label>
          <Controller
            name="skadelidt.dekningsforhold.stillingstittelTilDenSkadelidte"
            control={control}
            rules={{
              required:
                _.isEmpty(
                  state.skadelidt.dekningsforhold
                    .stillingstittelTilDenSkadelidte
                ) && isFieldMandatory(stilling, rolletype) && 'Dette feltet er påkrevd',
            }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
                defaultValue={{
                  value:
                    state.skadelidt.dekningsforhold
                      .stillingstittelTilDenSkadelidte,
                  label:
                    state.skadelidt.dekningsforhold
                      .stillingstittelTilDenSkadelidte,
                }}
                isClearable
                onBlur={onBlur}
                onChange={(val) => onChange([val?.value])}
                options={stillingstitler}
                menuIsOpen={openMenu}
                onInputChange={handleInputChange}
                className="injured-position"
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
      )}
    </>
  );
};

export default InjuredForm;
