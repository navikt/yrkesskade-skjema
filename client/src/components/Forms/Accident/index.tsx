/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Select as NAVSelect,
  RadioGroup,
  Label,
  BodyShort,
  Radio,
} from '@navikt/ds-react';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useSelectedCompany } from '../../../context/SelectedCompanyContext';
import { useEffect, useState } from 'react';
import Address from '../Address';
import formUpdateAction from '../../../State/actions/formUpdateAction';
import { useStateMachine } from 'little-state-machine';
import _ from 'lodash';
import { oppdaterSetSammeSomVirksomhetsAdresse, oppdaterUlykkesstedAdresse } from '../../../State/actions/skademeldingStateAction';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectKodeverk } from '../../../core/reducers/kodeverk.reducer';

interface IProps {
  register: any;
  errors: any;
  control: any;
}
const AccidentForm = ({ register, errors, control }: IProps) => {
  const { selectedAddress } = useSelectedCompany();
  const { state, actions } = useStateMachine({ formUpdateAction, oppdaterSetSammeSomVirksomhetsAdresse, oppdaterUlykkesstedAdresse });
  const alvorlighetsgradkoder = useAppSelector((state) =>
    selectKodeverk(state, 'alvorlighetsgrad')
  );
  const hvorSkjeddeUlykkenkoder = useAppSelector((state) => selectKodeverk(state, 'hvorSkjeddeUlykken'));
  const typeArbeidsplasskoder = useAppSelector((state) => selectKodeverk(state, 'typeArbeidsplass'));
  const aarsakOgBakgrunnkoder = useAppSelector((state) => selectKodeverk(state, 'aarsakOgBakgrunn'));
  const bakgrunnForHendelsenkoder = useAppSelector((state) => selectKodeverk(state, 'bakgrunnForHendelsen'));
  const { getValues, setValue } = useForm();
  const [sammeSomVirksomhetensAdresse, setSammeSomVirksomhetensAdresse] =
    useState<boolean>(
      getValues('hendelsesfakta.ulykkessted.sammeSomVirksomhetensAdresse') ||
        selectedAddress
        ? true
        : false
    );

    useEffect(() => {
      actions.oppdaterSetSammeSomVirksomhetsAdresse(sammeSomVirksomhetensAdresse);
      if (sammeSomVirksomhetensAdresse) {
        if (!selectedAddress) {
          return;
        }
        actions.oppdaterUlykkesstedAdresse({
          adresselinje1: selectedAddress.adresser ? selectedAddress.adresser[0] : '',
          adresselinje2: selectedAddress.postnummer || '',
          adresselinje3: selectedAddress.poststed || '',
          land: selectedAddress.landkode || ''
        })
      }
      setValue('hendelsesfakta.ulykkessted.sammeSomVirksomhetensAdresse', sammeSomVirksomhetensAdresse);
    }, [sammeSomVirksomhetensAdresse])

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
                legend="Skjedde ulykken på samme adresse?"
                defaultValue="true"
                onChange={(val) => {
                  setSammeSomVirksomhetensAdresse(val === 'true');
                  onChange(val === 'true');
                }}
                onBlur={onBlur}
                error={
                  errors?.hendelsesfakta?.ulykkessted?.sammeSomVirksomhetensAdresse &&
                  errors?.hendelsesfakta?.ulykkessted?.sammeSomVirksomhetensAdresse.message
                }
              >
                <Radio value="true">Ja</Radio>
                <Radio value="false">Nei</Radio>
              </RadioGroup>
            )}
          />
        </>
      )}

      {(!selectedAddress || !sammeSomVirksomhetensAdresse) && (
        <Address register={register} errors={errors} control={control} />
      )}

      <RadioGroup
        className="spacer"
        legend="Hvor alvorlig var hendelsen? (Valgfritt)"
        error={
          errors?.skade?.alvorlighetsgrad &&
          errors?.skade?.alvorlighetsgrad.message
        }
      >
        { alvorlighetsgradkoder && Object.keys(alvorlighetsgradkoder).map((alvorlighetsgradkode: string, index: number) => (
          <div className="navds-radio navds-radio--medium" key={alvorlighetsgradkode}>
            <input
              type="radio"
              className="navds-radio__input"
              {...register('skade.alvorlighetsgrad', {
                required: false
              })}
              value={alvorlighetsgradkode}
              data-testid={ `injury-severity-${index}`}
              id={ `injury-severity-${index}`}
            />
            <label
              htmlFor={ `injury-severity-${index}`}
              className="navds-radio__label"
            >
              { alvorlighetsgradkoder[alvorlighetsgradkode]?.verdi }
            </label>
          </div>
        ))
      }
      </RadioGroup>

      <NAVSelect
        className="spacer"
        label="Hvor skjedde ulykken"
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
        {hvorSkjeddeUlykkenkoder && Object.keys(hvorSkjeddeUlykkenkoder).map((kode: string) => {
          return (
            <option key={encodeURI(kode)} value={kode}>
              {hvorSkjeddeUlykkenkoder[kode]?.verdi}
            </option>
          )
        })}
      </NAVSelect>

      <NAVSelect
        className="spacer"
        label="Hvilken type arbeidsplass er det?"
        {...register('hendelsesfakta.stedsbeskrivelseTabellF', {
          required: 'Dette feltet er påkrevd',
        })}
        data-testid="accident-place-type"
        error={
          errors?.hendelsesfakta?.stedsbeskrivelseTabellF &&
          errors?.hendelsesfakta?.stedsbeskrivelseTabellF.message
        }
      >
        <option hidden value=""></option>
        {typeArbeidsplasskoder && Object.keys(typeArbeidsplasskoder).map((kode: string) => {
          return (
            <option key={encodeURI(kode)} value={kode}>
              {typeArbeidsplasskoder[kode]?.verdi}
            </option>
          );
        })}
      </NAVSelect>

      <div className="spacer spacer navds-form-field navds-form-field--medium">
        <Label className="navds-select__label navds-label">
          Beskriv årsak for hendelsen og bakgrunn for årsaken. Gi en mest mulig
          komplett utfylling.
        </Label>
        <BodyShort className="navds-select__description navds-body-short">
          Du kan velge flere alternativer
        </BodyShort>
        <Controller
          name="hendelsesfakta.aarsakUlykkeTabellAogE"
          control={control}
          rules={{
            required:
              _.isEmpty(state.hendelsesfakta.aarsakUlykkeTabellAogE) &&
              'Dette feltet er påkrevd',
          }}
          render={({ field }) => (
            <Select
              className="aarsak-ulykke-tabell-a-e"
              closeMenuOnSelect={false}
              isMulti
              options={aarsakOgBakgrunnkoder && Object.keys(aarsakOgBakgrunnkoder).map((kode: string) => ({ value: kode, label: aarsakOgBakgrunnkoder[kode]?.verdi || 'UKJENT' }))}
              defaultValue={
                !_.isEmpty(state.hendelsesfakta.aarsakUlykkeTabellAogE)
                  ? state.hendelsesfakta.aarsakUlykkeTabellAogE.map((i) => {
                      return { value: i, label: (aarsakOgBakgrunnkoder && aarsakOgBakgrunnkoder[i]?.verdi || 'UKJENT') };
                    })
                  : []
              }
              placeholder=""
              onChange={(val) => field.onChange(val.map((i) => i.value))}
            />
          )}
        />
        {errors?.hendelsesfakta?.aarsakUlykkeTabellAogE && (
          <span className="navds-error-message navds-error-message--medium navds-label">
            {errors.hendelsesfakta.aarsakUlykkeTabellAogE.message}
          </span>
        )}
      </div>

      <div className="spacer spacer navds-form-field navds-form-field--medium">
        <Label className="navds-select__label navds-label">
          Hva var bakgrunnen til hendelsen?
        </Label>
        <BodyShort className="navds-select__description navds-body-short">
          Du kan velge flere alternativer
        </BodyShort>
        <Controller
          name="hendelsesfakta.bakgrunnsaarsakTabellBogG"
          control={control}
          rules={{
            required:
              _.isEmpty(state.hendelsesfakta.bakgrunnsaarsakTabellBogG) &&
              'Dette feltet er påkrevd',
          }}
          render={({ field }) => (
            <Select
              className="bakgrunnsaarsak-b-g"
              defaultValue={
                !_.isEmpty(state.hendelsesfakta.bakgrunnsaarsakTabellBogG)
                  ? state.hendelsesfakta.bakgrunnsaarsakTabellBogG.map((i) => {
                      return { value: i, label: (bakgrunnForHendelsenkoder && bakgrunnForHendelsenkoder[i]?.verdi || 'UKJENT') };
                    })
                  : []
              }
              closeMenuOnSelect={false}
              isMulti
              options={bakgrunnForHendelsenkoder && Object.keys(bakgrunnForHendelsenkoder).map((kode: string) => ({ value: kode, label: bakgrunnForHendelsenkoder[kode]?.verdi || 'UKJENT' }))}
              placeholder=""
              onChange={(val) => field.onChange(val.map((i) => i.value))}
            />
          )}
        />
        {errors?.hendelsesfakta?.bakgrunnsaarsakTabellBogG && (
          <span className="navds-error-message navds-error-message--medium navds-label">
            {errors.hendelsesfakta.bakgrunnsaarsakTabellBogG.message}
          </span>
        )}
      </div>
    </>
  );
};

export default AccidentForm;
