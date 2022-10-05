/* eslint-disable no-mixed-operators */
import { useEffect, useState } from 'react';
import {
  TextField,
  Label,
  Select as NAVSelect,
  BodyLong,
} from '@navikt/ds-react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
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
import Tidsperiode from '../../Tidsperiode';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { InputClassNames } from 'react-day-picker/types/ClassNames';
import {
  handleDateValue,
  // handleTimeValue,
  // isKlokkeslett,
} from '../../../utils/date';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { DateUtils } from 'react-day-picker';

import roller from '../../../utils/roller';

function formatDate(date: number | Date, format: string) {
  return dateFnsFormat(date, format);
}

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
      'hvorSkjeddeUlykken',
      'typeArbeidsplass',
      'bakgrunnForHendelsen',
      'harSkadelidtHattFravaer',
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

  const dayPickerClassNames = {
    container: 'nav-day-picker',
    overlay: '',
    overlayWrapper: '',
  } as InputClassNames;

  const whenDayPickerClassNames = {
    ...dayPickerClassNames,
    container: `${dayPickerClassNames.container}`,
  };

  const FORMAT: string = 'dd.MM.yyyy';

  const [utdanningStartDato, setUtdanningStartDato] = useState<
    Date | undefined
  >(handleDateValue(skademelding.skadelidt.dekningsforhold.utdanningStart));

  const parseDate = (str: string, format: string) => {
    // sjekk at vi har skrevet noe og at noe er 10 tegn
    if (!str || str.length !== 10) {
      return undefined;
    }

    // parse noe til dato om mulig
    const parsed = dateFnsParse(str, format, new Date());
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }

    // ikke dato
    return undefined;
  };

  useEffect(() => {
    setValue(
      'skadelidt.dekningsforhold.utdanningStart',
      utdanningStartDato?.toISOString()
    );
  }, [utdanningStartDato, setValue]);

  let utdanningStartLabel = 'Når startet lærlingperioden?';
  switch (rolletype) {
    case 'militaerElev':
      utdanningStartLabel = 'Når startet utdanningen?';
      break;
  }

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
      {roller[rolletype] && roller[rolletype].showStillinger && (
        <div className="spacer">
          <Label>Hva er den skadelidtes stilling</Label>
          {stillingstittelkoder && (
            <>
              <Controller
                name="skadelidt.dekningsforhold.stillingstittelTilDenSkadelidte"
                control={control}
                rules={{
                  required:
                    roller[rolletype] &&
                    roller[rolletype].showStillinger &&
                    _.isEmpty(
                      skademelding.skadelidt?.dekningsforhold
                        .stillingstittelTilDenSkadelidte
                    ) &&
                    'Dette feltet er påkrevd',
                }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    placeholder=""
                    components={{
                      DropdownIndicator: () => null,
                      IndicatorSeparator: () => null,
                    }}
                    defaultValue={
                      !_.isEmpty(skademelding.skadelidt.dekningsforhold)
                        ? skademelding.skadelidt.dekningsforhold.stillingstittelTilDenSkadelidte?.map(
                            (stilling) => {
                              return {
                                value: stilling,
                                label:
                                  (stillingstittelkoder &&
                                    stillingstittelkoder[stilling]?.verdi) ||
                                  '',
                              };
                            }
                          )
                        : []
                    }
                    onBlur={onBlur}
                    onChange={(val) => onChange([val?.value])}
                    options={Object.keys(stillingstittelkoder).map((kode) => ({
                      value: kode,
                      label: stillingstittelkoder[kode]?.verdi || '',
                    }))}
                    menuIsOpen={openMenu}
                    onInputChange={handleInputChange}
                    className="injured-position"
                  />
                )}
              />
              {(
                errors?.skadelidt?.dekningsforhold
                  ?.stillingstittelTilDenSkadelidte as unknown as FieldError
              )?.message && (
                <span className="navds-error-message navds-error-message--medium navds-label">
                  {
                    (
                      errors?.skadelidt?.dekningsforhold
                        ?.stillingstittelTilDenSkadelidte as unknown as FieldError
                    )?.message
                  }
                </span>
              )}
            </>
          )}
        </div>
      )}
      {roller[rolletype] && roller[rolletype].showServicePeriode && (
        <>
          <>
            <Label>Legg til periode for tjenesten</Label>
            <BodyLong>
              Om førstegangstjenesten ikke er avsluttet, legg inn dato for
              planlagt dimittering.
            </BodyLong>
          </>
          <div className="spacer">
            <Controller
              name="skadelidt.dekningsforhold.tjenesteperiodeEllerManoever"
              control={control}
              rules={{
                required: 'Dette feltet er påkrevd',
              }}
              render={({ field: { onChange } }) => (
                <Tidsperiode
                  periode={
                    skademelding.skadelidt.dekningsforhold
                      .tjenesteperiodeEllerManoever
                  }
                  onTidsperioderChange={(periode) => {
                    onChange(periode);
                  }}
                />
              )}
            />
            {errors?.skadelidt?.dekningsforhold
              ?.tjenesteperiodeEllerManoever && (
              <span className="navds-error-message navds-error-message--medium navds-label">
                Periode er påkrevd
              </span>
            )}
          </div>
        </>
      )}
      {roller[rolletype] && roller[rolletype].showEducationStarted && (
        <div className="spacer">
          <Label>{utdanningStartLabel}</Label>
          <Controller
            name="skadelidt.dekningsforhold.utdanningStart"
            control={control}
            render={({ field }) => (
              <DayPickerInput
                {...field}
                classNames={{ ...whenDayPickerClassNames }}
                placeholder="DD.MM.ÅÅÅÅ"
                value={utdanningStartDato}
                onDayChange={setUtdanningStartDato}
                formatDate={formatDate}
                format={FORMAT}
                parseDate={parseDate}
                dayPickerProps={{
                  firstDayOfWeek: 1,
                  disabledDays: {
                    after: new Date(),
                  },
                }}
              />
            )}
          />
        </div>
      )}
      {roller[rolletype] && roller[rolletype].showServiceDepartment && (
        <TextField
          className="spacer"
          {...register(
            'skadelidt.dekningsforhold.navnPaatjenestegjoerendeavdelingEllerFartoeyEllerStudiested',
            {
              required: 'Dette feltet er påkrevd',
            }
          )}
          label="Hva er den tjenestegjørende avdelingen?"
          type="text"
          error={
            errors?.skadelidt?.dekningsforhold
              ?.navnPaatjenestegjoerendeavdelingEllerFartoeyEllerStudiested &&
            errors?.skadelidt?.dekningsforhold
              ?.navnPaatjenestegjoerendeavdelingEllerFartoeyEllerStudiested
              .message
          }
          data-testid="injured-tjenestegjorende-avdeling"
        />
      )}
    </>
  );
};

export default InjuredForm;
