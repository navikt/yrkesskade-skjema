/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  // Select as NAVSelect,
  RadioGroup,
  Label,
  BodyShort,
  Radio,
} from '@navikt/ds-react';
import Select from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { useState } from 'react';
// import Address from '../Address';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/state.hooks';
import { selectKodeverk } from '../../../core/reducers/kodeverk.reducer';
import { oppdaaterBakgrunnsaarsak, oppdaterAarsakUlykke, oppdaterPaavirkningsform, selectSkademelding } from '../../../core/reducers/skademelding.reducer';
import { Skademelding } from '../../../api/yrkesskade';

import roller from '../../../utils/roller';
// import { selectOrganisasjonsAdresse } from '../../../core/reducers/app.reducer';

const AccidentForm = () => {
  const dispatch = useAppDispatch();
  // const selectedAddress = useAppSelector((state) => selectOrganisasjonsAdresse(state));
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<Skademelding>();

  const alvorlighetsgradkoder = useAppSelector((state) =>
    selectKodeverk(state, 'alvorlighetsgrad')
  );
  const skademelding = useAppSelector((state) => selectSkademelding(state));
  // const hvorSkjeddeUlykkenkoder = useAppSelector((state) =>
  //   selectKodeverk(state, 'hvorSkjeddeUlykken')
  // );
  // const typeArbeidsplasskoder = useAppSelector((state) =>
  //   selectKodeverk(state, 'typeArbeidsplass')
  // );
  const aarsakOgBakgrunnkoder = useAppSelector((state) =>
    selectKodeverk(state, 'aarsakOgBakgrunn')
  );
  const bakgrunnForHendelsenkoder = useAppSelector((state) =>
    selectKodeverk(state, 'bakgrunnForHendelsen')
  );
  const paavirkningsformkoder = useAppSelector((state) =>
    selectKodeverk(state, 'paavirkningsform')
  );

  // const [sammeSomVirksomhetensAdresse, setSammeSomVirksomhetensAdresse] =
  //   useState<string>(
  //     skademelding.hendelsesfakta?.ulykkessted.sammeSomVirksomhetensAdresse.toString() ||
  //       'true'
  //   );

  const [alvorlighetsgrad, setAlvorlighetsgrad] = useState<string>(
    skademelding.skade?.alvorlighetsgrad || ''
  );

  const handleAlvorlighetsgradChange = (value: string) => {
    setAlvorlighetsgrad(value);
  };

  const rolletype = skademelding.skadelidt?.dekningsforhold.rolletype || '';
  const isPeriod = skademelding?.hendelsesfakta?.tid?.tidstype === 'Periode';

  return (
    <>
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

      { !isPeriod && (
      <div className="spacer spacer navds-form-field navds-form-field--medium">
        <Label className="navds-select__label navds-label">
          Beskriv årsak for hendelsen og bakgrunn for årsaken. Gi en mest mulig
          komplett utfylling.
        </Label>
        <BodyShort className="navds-select__description navds-body-short">
          Du kan velge flere alternativer
        </BodyShort>
        <Controller
          name="hendelsesfakta.aarsakUlykke"
          control={control}
          rules={{
            required:
              _.isEmpty(skademelding.hendelsesfakta?.aarsakUlykke) &&
              'Dette feltet er påkrevd',
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
                !_.isEmpty(skademelding.hendelsesfakta?.aarsakUlykke)
                  ? skademelding.hendelsesfakta?.aarsakUlykke?.map(
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
              onChange={(val) => {
                const values = val.map((i) => i.value);
                field.onChange(values);
                dispatch(oppdaterAarsakUlykke(values));
              }}
            />
          )}
        />
        {errors?.hendelsesfakta?.aarsakUlykke && (
          <span className="navds-error-message navds-error-message--medium navds-label">
            Dette feltet er påkrevd
          </span>
        )}
      </div>
      )}

      {roller[rolletype] &&
        roller[rolletype].showAccidentBackground &&
        !isPeriod && (
          <div className="spacer spacer navds-form-field navds-form-field--medium">
            <Label className="navds-select__label navds-label">
              Hva var bakgrunnen til hendelsen?
            </Label>
            <BodyShort className="navds-select__description navds-body-short">
              Du kan velge flere alternativer
            </BodyShort>
            <Controller
              name="hendelsesfakta.bakgrunnsaarsak"
              control={control}
              rules={{
                required:
                  _.isEmpty(
                    skademelding.hendelsesfakta?.bakgrunnsaarsak
                  ) && 'Dette feltet er påkrevd',
              }}
              render={({ field }) => (
                <Select
                  className="bakgrunnsaarsak-b-g"
                  defaultValue={
                    !_.isEmpty(
                      skademelding.hendelsesfakta?.bakgrunnsaarsak
                    )
                      ? skademelding.hendelsesfakta?.bakgrunnsaarsak?.map(
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
                        label:
                          bakgrunnForHendelsenkoder[kode]?.verdi || 'UKJENT',
                      })
                    )
                  }
                  placeholder=""
                  onChange={(val) => {
                      const values = val.map((i: { value: string; label: string }) => i.value);
                      field.onChange(values);
                      dispatch(oppdaaterBakgrunnsaarsak(values));
                    }
                  }
                />
              )}
            />
            {errors?.hendelsesfakta?.bakgrunnsaarsak && (
              <span className="navds-error-message navds-error-message--medium navds-label">
                Dette feltet er påkrevd
              </span>
            )}
          </div>
        )}

      {isPeriod && paavirkningsformkoder && (
        <div className="spacer spacer navds-form-field navds-form-field--medium">
          <Label className="navds-select__label navds-label">
            Hvilken skadelig påvirkning har personen vært utsatt for?
          </Label>
          <Controller
            name="hendelsesfakta.paavirkningsform"
            control={control}
            rules={{
              required:
                _.isEmpty(skademelding.hendelsesfakta?.paavirkningsform) &&
                'Dette feltet er påkrevd',
            }}
            render={({ field }) => (
              <Select
                className="paavirkningsform-b-g"
                defaultValue={
                  !_.isEmpty(skademelding?.hendelsesfakta?.paavirkningsform)
                    ? skademelding?.hendelsesfakta?.paavirkningsform?.map(
                        (i) => {
                          return {
                            value: i,
                            label:
                              (paavirkningsformkoder &&
                                paavirkningsformkoder[i]?.verdi) ||
                              'UKJENT',
                          };
                        }
                      )
                    : []
                }
                closeMenuOnSelect={false}
                isMulti
                options={
                  paavirkningsformkoder && !_.isEmpty(paavirkningsformkoder)
                    ? Object.keys(paavirkningsformkoder).map(
                        (kode: string) => ({
                          value: kode,
                          label: paavirkningsformkoder[kode]?.verdi || 'UKJENT',
                        })
                      )
                    : []
                }
                placeholder=""
                onChange={(val) => {
                  const values = val.map((i: { value: string; label: string }) => i.value);
                  field.onChange(values);
                  dispatch(oppdaterPaavirkningsform(values))
                }

                }
                data-testid="accident-paavirkningsform"
              />
            )}
          />
          {errors?.hendelsesfakta?.paavirkningsform && (
            <span className="navds-error-message navds-error-message--medium navds-label">
              Dette feltet er påkrevd
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default AccidentForm;
