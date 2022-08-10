/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Select as NAVSelect,
  RadioGroup,
  Label,
  BodyShort,
  Radio,
} from '@navikt/ds-react';
// import Select from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import Address from '../Address';
// import _ from 'lodash';
import {
  //useAppDispatch,
  useAppSelector,
} from '../../../core/hooks/state.hooks';
import { selectKodeverk } from '../../../core/reducers/kodeverk.reducer';
import { selectSkademelding } from '../../../core/reducers/skademelding.reducer';
import { Skademelding } from '../../../api/yrkesskade';

import roller from '../../../utils/roller';
import { selectOrganisasjonsAdresse } from '../../../core/reducers/app.reducer';

const AccidentPlaceForm = () => {
  // const dispatch = useAppDispatch();
  const selectedAddress = useAppSelector((state) =>
    selectOrganisasjonsAdresse(state)
  );
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<Skademelding>();

  const skademelding = useAppSelector((state) => selectSkademelding(state));
  const hvorSkjeddeUlykkenkoder = useAppSelector((state) =>
    selectKodeverk(state, 'hvorSkjeddeUlykken')
  );
  const typeArbeidsplasskoder = useAppSelector((state) =>
    selectKodeverk(state, 'typeArbeidsplass')
  );

  const [sammeSomVirksomhetensAdresse, setSammeSomVirksomhetensAdresse] =
    useState<string>(
      skademelding.hendelsesfakta?.ulykkessted.sammeSomVirksomhetensAdresse.toString() ||
        'true'
    );

  const rolletype = skademelding.skadelidt?.dekningsforhold.rolletype || '';
  const isPeriod = skademelding?.hendelsesfakta?.tid?.tidstype === 'Periode';

  return (
    <>
      {selectedAddress && (
        <>
          <div>
            <Label spacing>Adresse</Label>

            <BodyShort data-testid="injury-street-address">
              {selectedAddress.adresser && selectedAddress.adresser[0]}
            </BodyShort>
            <BodyShort data-testid="injury-postal-code-place">
              {selectedAddress.postnummer} {selectedAddress.poststed}
            </BodyShort>
          </div>

          <Controller
            name="hendelsesfakta.ulykkessted.sammeSomVirksomhetensAdresse"
            control={control}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <RadioGroup
                className="spacer"
                legend="Ble personen utsatt for den skadelige påvirkningen på samme adresse?"
                value={sammeSomVirksomhetensAdresse}
                onChange={(val) => {
                  setSammeSomVirksomhetensAdresse(val);
                  onChange(val === 'true');
                }}
                onBlur={onBlur}
                error={
                  errors?.hendelsesfakta?.ulykkessted
                    ?.sammeSomVirksomhetensAdresse &&
                  errors?.hendelsesfakta?.ulykkessted
                    ?.sammeSomVirksomhetensAdresse.message
                }
              >
                <Radio
                  value="true"
                  {...register(
                    'hendelsesfakta.ulykkessted.sammeSomVirksomhetensAdresse'
                  )}
                >
                  Ja
                </Radio>
                <Radio
                  value="false"
                  {...register(
                    'hendelsesfakta.ulykkessted.sammeSomVirksomhetensAdresse'
                  )}
                >
                  Nei
                </Radio>
              </RadioGroup>
            )}
          />
        </>
      )}

      <Address
        sammeSomVirksomhetensAdresse={sammeSomVirksomhetensAdresse}
        adresse={selectedAddress}
        erPeriode={isPeriod}
      />

      <NAVSelect
        className="spacer"
        label="Hvor skjedde hendelsen?"
        {...register('hendelsesfakta.hvorSkjeddeUlykken', {
          required: 'Dette feltet er påkrevd',
        })}
        data-testid="accident-place"
        error={
          errors?.hendelsesfakta?.hvorSkjeddeUlykken &&
          errors?.hendelsesfakta?.hvorSkjeddeUlykken.message
        }
      >
        <option hidden value=""></option>
        {hvorSkjeddeUlykkenkoder &&
          Object.keys(hvorSkjeddeUlykkenkoder).map((kode: string) => {
            return (
              <option key={encodeURI(kode)} value={kode}>
                {hvorSkjeddeUlykkenkoder[kode]?.verdi}
              </option>
            );
          })}
      </NAVSelect>
      {roller[rolletype] && roller[rolletype].showWorkplace && !isPeriod && (
        <NAVSelect
          className="spacer"
          label="Hvilken type arbeidsplass er det?"
          {...register('hendelsesfakta.stedsbeskrivelse', {
            required: 'Dette feltet er påkrevd',
          })}
          data-testid="accident-place-type"
          error={
            errors?.hendelsesfakta?.stedsbeskrivelse &&
            errors?.hendelsesfakta?.stedsbeskrivelse.message
          }
        >
          <option hidden value=""></option>
          {typeArbeidsplasskoder &&
            Object.keys(typeArbeidsplasskoder).map((kode: string) => {
              return (
                <option key={encodeURI(kode)} value={kode}>
                  {typeArbeidsplasskoder[kode]?.verdi}
                </option>
              );
            })}
        </NAVSelect>
      )}
    </>
  );
};

export default AccidentPlaceForm;
