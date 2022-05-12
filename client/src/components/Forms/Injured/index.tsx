/* eslint-disable no-mixed-operators */
import { useEffect, useState } from 'react';
import { TextField, Label, Select as NAVSelect } from '@navikt/ds-react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import validator from '@navikt/fnrvalidator';
import { useInnloggetContext } from '../../../context/InnloggetContext';
import _ from 'lodash';

import './Injured.less';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../core/hooks/state.hooks';
import {
  hentKodeverkForKategori,
  selectKodeverk,
} from '../../../core/reducers/kodeverk.reducer';
import { selectSkademelding } from '../../../core/reducers/skademelding.reducer';
import { Skademelding } from '../../../api/yrkesskade';

import roller from '../../../utils/roller';

const InjuredForm = () => {
  const { register, formState: { errors }, control, setValue } = useFormContext<Skademelding>();
  const { innloggetBruker } = useInnloggetContext();
  const dispatch = useAppDispatch();
  const skademelding = useAppSelector((state) => selectSkademelding(state));

  const [openMenu, setOpenMenu] = useState(false);
  const [rolletype, setRolletype] = useState<string>(
    skademelding.skadelidt?.dekningsforhold.rolletype || ''
  );
  const rolletypekoder = useAppSelector((state) =>
    selectKodeverk(state, 'rolletype')
  );
  const stillingstittelkoder = useAppSelector((state) =>
    selectKodeverk(state, 'stillingstittel')
  );

  // Åpner stillingsinputen når det er skrevet 2 eller fler tegn
  const handleInputChange = (query: string, action: any) => {
    if (action.action === 'input-change' && query.length >= 2) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    if(rolletype.toLowerCase() === 'elev' ) {
      setValue('skadelidt.dekningsforhold.stillingstittelTilDenSkadelidte', []);
    }
  }, [rolletype, setValue]);

  const handleRolletypeEndring = (event: any) => {
    setRolletype(event.target.value);
  };

  useEffect(() => {
    if (!rolletype) {
      // rolletype er ikke satt og vi kan ikke laste kodeverk
      return;
    }
    const rolletypeverdi = rolletype.toLocaleLowerCase();
    [
      'tidsrom',
      'alvorlighetsgrad',
      'hvorSkjeddeUlykken',
      'typeArbeidsplass',
      'aarsakOgBakgrunn',
      'bakgrunnForHendelsen',
      'harSkadelidtHattFravaer',
      'skadetKroppsdel',
      'skadetype',
      'stillingstittel',
    ].forEach((typenavn) =>
      dispatch(
        hentKodeverkForKategori({
          typenavn: typenavn,
          kategorinavn: rolletypeverdi,
        })
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolletype]);

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
        label="Hva er den skadelidtes tilknytning til virksomheten?"
        {...register('skadelidt.dekningsforhold.rolletype', {
          required: 'Dette feltet er påkrevd',
        })}
        onChange={handleRolletypeEndring}
        data-testid="injured-role-select"
        error={
          errors?.skadelidt?.dekningsforhold?.rolletype &&
          errors?.skadelidt?.dekningsforhold.rolletype.message
        }
        value={rolletype}
      >
        <option hidden value=""></option>
        {rolletypekoder &&
          Object.keys(rolletypekoder).map((kode: string) => {
            return (
              <option key={encodeURI(kode)} value={kode}>
                {rolletypekoder[kode]?.verdi || 'UKJENT'}
              </option>
            );
          })}
      </NAVSelect>
      {roller[rolletype] && !roller[rolletype].isElevEllerStudent && (
      <div className="spacer">
        <Label>Hva er den skadelidtes stilling</Label>
        {stillingstittelkoder && (
          <>
            <Controller
              name="skadelidt.dekningsforhold.stillingstittelTilDenSkadelidte"
              control={control}
              rules={{
                required:
                  _.isEmpty(
                    skademelding.skadelidt?.dekningsforhold
                      .stillingstittelTilDenSkadelidte
                  ) && 'Dette feltet er påkrevd',
              }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  placeholder=""
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  defaultValue={
                    !_.isEmpty(skademelding.skadelidt?.dekningsforhold)
                      ? skademelding.skadelidt?.dekningsforhold.stillingstittelTilDenSkadelidte?.map(
                          (stilling) => {
                            return {
                              value: stilling,
                              label:
                                (stillingstittelkoder &&
                                  stillingstittelkoder[stilling]?.verdi) ||
                                'UKJENT',
                            };
                          }
                        )
                      : []
                  }
                  onBlur={onBlur}
                  onChange={(val) => onChange([val?.value])}
                  options={Object.keys(stillingstittelkoder).map((kode) => ({
                    value: kode,
                    label: stillingstittelkoder[kode]?.verdi || 'UKJENT',
                  }))}
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
                  errors.skadelidt.dekningsforhold
                    .stillingstittelTilDenSkadelidte
                }
              </span>
            )}
          </>
        )}
      </div>
    )}
    </>
  );
};

export default InjuredForm;
