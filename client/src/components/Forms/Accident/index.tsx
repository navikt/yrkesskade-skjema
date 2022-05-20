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
import { Controller, useFormContext } from 'react-hook-form';
import { useSelectedCompany } from '../../../context/SelectedCompanyContext';
import { useEffect, useState } from 'react';
import Address from '../Address';
import _ from 'lodash';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectKodeverk } from '../../../core/reducers/kodeverk.reducer';
import { selectSkademelding } from '../../../core/reducers/skademelding.reducer';
import { Skademelding } from '../../../api/yrkesskade';

import roller from '../../../utils/roller';

const AccidentForm = () => {
  const { selectedAddress } = useSelectedCompany();
  const {
    register,
    formState: { errors },
    control,
    setValue
  } = useFormContext<Skademelding>();

  const alvorlighetsgradkoder = useAppSelector((state) =>
    selectKodeverk(state, 'alvorlighetsgrad')
  );
  const skademelding = useAppSelector((state) => selectSkademelding(state));
  const hvorSkjeddeUlykkenkoder = useAppSelector((state) =>
    selectKodeverk(state, 'hvorSkjeddeUlykken')
  );
  const typeArbeidsplasskoder = useAppSelector((state) =>
    selectKodeverk(state, 'typeArbeidsplass')
  );
  const aarsakOgBakgrunnkoder = useAppSelector((state) =>
    selectKodeverk(state, 'aarsakOgBakgrunn')
  );
  const bakgrunnForHendelsenkoder = useAppSelector((state) =>
    selectKodeverk(state, 'bakgrunnForHendelsen')
  );
  const [sammeSomVirksomhetensAdresse, setSammeSomVirksomhetensAdresse] = useState<string>(skademelding.hendelsesfakta?.ulykkessted.sammeSomVirksomhetensAdresse.toString() || 'true');

  const [alvorlighetsgrad, setAlvorlighetsgrad] = useState<string>(
    skademelding.skade?.alvorlighetsgrad || ''
  );

  const handleAlvorlighetsgradChange = (value: string) => {
    setAlvorlighetsgrad(value);
  };


  const [rolletype] = useState<string>(
    skademelding.skadelidt?.dekningsforhold.rolletype || ''
  );

  useEffect(() => {
    if (rolletype.toLowerCase() === 'elev') {
      setValue('hendelsesfakta.stedsbeskrivelseTabellF', '');
    }
  }, [rolletype, setValue]);

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
      />

      {alvorlighetsgradkoder && (
        <RadioGroup
          className="spacer"
          legend="Hvor alvorlig var hendelsen? (Valgfritt)"
          error={
            errors?.skade?.alvorlighetsgrad &&
            errors?.skade?.alvorlighetsgrad.message
          }
          {...register('skade.alvorlighetsgrad')}
          value={alvorlighetsgrad}
          onChange={(e) => handleAlvorlighetsgradChange(e)}
        >
          {Object.keys(alvorlighetsgradkoder).map(
            (alvorlighetsgradkode: string, index: number) => (
              <Radio
                value={alvorlighetsgradkode}
                key={alvorlighetsgradkode}
                data-testid={`injury-severity-${index}`}
                id={`injury-severity-${index}`}
                {...register('skade.alvorlighetsgrad')}
              >
                {alvorlighetsgradkoder[alvorlighetsgradkode]?.verdi}
              </Radio>
            )
          )}
        </RadioGroup>
      )}

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
        {hvorSkjeddeUlykkenkoder &&
          Object.keys(hvorSkjeddeUlykkenkoder).map((kode: string) => {
            return (
              <option key={encodeURI(kode)} value={kode}>
                {hvorSkjeddeUlykkenkoder[kode]?.verdi}
              </option>
            );
          })}
      </NAVSelect>
      {roller[rolletype] && !roller[rolletype].isElevEllerStudent && (
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

      {/* {roller[rolletype] && !roller[rolletype].isElevEllerStudent && ( */}
        <div className="spacer spacer navds-form-field navds-form-field--medium">
          <Label className="navds-select__label navds-label">
            Beskriv årsak for hendelsen og bakgrunn for årsaken. Gi en mest
            mulig komplett utfylling.
          </Label>
          <BodyShort className="navds-select__description navds-body-short">
            Du kan velge flere alternativer
          </BodyShort>
          <Controller
            name="hendelsesfakta.aarsakUlykkeTabellAogE"
            control={control}
            rules={{
              required:
                _.isEmpty(
                  skademelding.hendelsesfakta?.aarsakUlykkeTabellAogE
                ) && 'Dette feltet er påkrevd',
            }}
            render={({ field }) => (
              <Select
                className="aarsak-ulykke-tabell-a-e"
                closeMenuOnSelect={false}
                isMulti
                options={
                  aarsakOgBakgrunnkoder &&
                  Object.keys(aarsakOgBakgrunnkoder).map((kode: string) => ({
                    value: kode,
                    label: aarsakOgBakgrunnkoder[kode]?.verdi || 'UKJENT',
                  }))
                }
                defaultValue={
                  !_.isEmpty(
                    skademelding.hendelsesfakta?.aarsakUlykkeTabellAogE
                  )
                    ? skademelding.hendelsesfakta?.aarsakUlykkeTabellAogE.map(
                        (i) => {
                          return {
                            value: i,
                            label:
                              (aarsakOgBakgrunnkoder &&
                                aarsakOgBakgrunnkoder[i]?.verdi) ||
                              'UKJENT',
                          };
                        }
                      )
                    : []
                }
                placeholder=""
                onChange={(val) => field.onChange(val.map((i) => i.value))}
              />
            )}
          />
          {errors?.hendelsesfakta?.aarsakUlykkeTabellAogE && (
            <span className="navds-error-message navds-error-message--medium navds-label">
              {/* {errors.hendelsesfakta.aarsakUlykkeTabellAogE.map(
                (fieldError) => fieldError.message
              )} */}
              Dette feltet er påkrevd
            </span>
          )}
        </div>
      {/* )} */}
      {/* {roller[rolletype] && !roller[rolletype].isElevEllerStudent && ( */}
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
                _.isEmpty(
                  skademelding.hendelsesfakta?.bakgrunnsaarsakTabellBogG
                ) && 'Dette feltet er påkrevd',
            }}
            render={({ field }) => (
              <Select
                className="bakgrunnsaarsak-b-g"
                defaultValue={
                  !_.isEmpty(
                    skademelding.hendelsesfakta?.bakgrunnsaarsakTabellBogG
                  )
                    ? skademelding.hendelsesfakta?.bakgrunnsaarsakTabellBogG.map(
                        (i) => {
                          return {
                            value: i,
                            label:
                              (bakgrunnForHendelsenkoder &&
                                bakgrunnForHendelsenkoder[i]?.verdi) ||
                              'UKJENT',
                          };
                        }
                      )
                    : []
                }
                closeMenuOnSelect={false}
                isMulti
                options={
                  bakgrunnForHendelsenkoder &&
                  Object.keys(bakgrunnForHendelsenkoder).map(
                    (kode: string) => ({
                      value: kode,
                      label: bakgrunnForHendelsenkoder[kode]?.verdi || 'UKJENT',
                    })
                  )
                }
                placeholder=""
                onChange={(val) => field.onChange(val.map((i) => i.value))}
              />
            )}
          />
          {errors?.hendelsesfakta?.bakgrunnsaarsakTabellBogG && (
            <span className="navds-error-message navds-error-message--medium navds-label">
              {/* {errors.hendelsesfakta.bakgrunnsaarsakTabellBogG?.map( */}
                Dette feltet er påkrevd
              {/* )} */}
            </span>
          )}
        </div>
      {/* )} */}
    </>
  );
};

export default AccidentForm;
