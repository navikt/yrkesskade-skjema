import { useState, useEffect } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {
  Select,
  Label,
  ToggleGroup,
  BodyLong,
  ReadMore,
  RadioGroup,
  Radio,
} from '@navikt/ds-react';
import InputMask from 'react-input-mask';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { Controller, useFormContext } from 'react-hook-form';
import {
  handleDateValue,
  handleTimeValue,
  isKlokkeslett,
} from '../../../utils/date';
import './Timeframe.less';
import { InputClassNames } from 'react-day-picker/types/ClassNames';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectKodeverk } from '../../../core/reducers/kodeverk.reducer';
import { selectSkademelding } from '../../../core/reducers/skademelding.reducer';
import { Skademelding, Tid } from '../../../api/yrkesskade';
import { nb } from 'date-fns/locale';
import Tidsperioder from '../../Tidsperioder';
import roller from '../../../utils/roller';

function formatDate(date: number | Date, format: string) {
  return dateFnsFormat(date, format);
}
const TimeframeForm = () => {
  const FORMAT: string = 'dd.MM.yyyy';
  const TIDSPUNKT_FORMAT: string = `${FORMAT} HH:mm`;

  const {
    register,
    formState: { errors },
    setValue,
    control,
  } = useFormContext<Skademelding>();

  const state = useAppSelector((state) => selectSkademelding(state));
  const tidsromkoder = useAppSelector((state) =>
    selectKodeverk(state, 'tidsrom')
  );

  const rolletype = state.skadelidt?.dekningsforhold.rolletype || '';

  const dayPickerClassNames = {
    container: 'nav-day-picker',
    overlay: '',
    overlayWrapper: '',
  } as InputClassNames;

  const whenDayPickerClassNames = {
    ...dayPickerClassNames,
    container: `timeframe-when-date ${dayPickerClassNames.container}`,
  };

  const [timeType, setTimeType] = useState(state.hendelsesfakta?.tid.tidstype);
  const [specificDate, setSpecificDate] = useState<Date | undefined>(
    handleDateValue(state.hendelsesfakta.tid.tidspunkt)
  );

  const [specificTime, setSpecificTime] = useState<string | undefined>(
    handleTimeValue(state.hendelsesfakta.tid.tidspunkt)
  );

  const [sicknessDate, setSicknessDate] = useState<Date | undefined>(
    handleDateValue(state.hendelsesfakta.tid.sykdomPaavist)
  );

  const handleKlokkeChange = (event: any) => {
    setSpecificTime(event.target.value);
  };

  useEffect(() => {
    if (specificDate && specificTime && isKlokkeslett(specificTime)) {
      const dato = formatDate(specificDate, FORMAT);
      const tidspunkt = `${dato} ${specificTime}`;

      const isoDate = dateFnsParse(tidspunkt, TIDSPUNKT_FORMAT, new Date(), {
        locale: nb,
      }).toISOString();

      setValue('hendelsesfakta.tid.tidspunkt', isoDate);
    }
  }, [specificTime, specificDate, setValue, TIDSPUNKT_FORMAT]);

  useEffect(() => {
    if (timeType !== 'Periode') {
      return;
    }

    setValue('hendelsesfakta.tid.sykdomPaavist', sicknessDate?.toISOString());
  }, [timeType, sicknessDate, setValue]);

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

  const [manover, setManover] = useState<string>(
    state.skadelidt?.dekningsforhold?.underOrdreOmManoever ? 'Ja' : 'Nei'
  );

  const handleManoverChange = (value: string) => {
    setManover(value);
  };

  return (
    <>
      <ToggleGroup
        onChange={(tidstype: any) => {
          setValue('hendelsesfakta.tid.tidstype', tidstype);
          setTimeType(tidstype);
        }}
        size="medium"
        value={timeType}
        label="Når skjedde ulykken som skal meldes?"
      >
        <ToggleGroup.Item value={Tid.tidstype.TIDSPUNKT}>
          På en dato
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value={Tid.tidstype.PERIODE}
          data-testid="timeframe-when-over-period"
        >
          Over en periode
        </ToggleGroup.Item>
        <ToggleGroup.Item value={Tid.tidstype.UKJENT}>Ukjent</ToggleGroup.Item>
      </ToggleGroup>
      <div className="toggleGroup-content">
        {timeType === 'Tidspunkt' && (
          <>
            <div className="periode-container">
              <div className="dateTime-date spacer">
                <Label>Velg dato</Label>
                <Controller
                  name="hendelsesfakta.tid.tidspunkt"
                  control={control}
                  render={({ field }) => (
                    <DayPickerInput
                      {...field}
                      classNames={{ ...whenDayPickerClassNames }}
                      placeholder="DD.MM.ÅÅÅÅ"
                      value={specificDate}
                      onDayChange={setSpecificDate}
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

              {timeType === 'Tidspunkt' && specificDate !== null && (
                <div className="dateTime-time spacer">
                  <Label>klokkeslett</Label>
                  {/* <label htmlFor="timeframe-when-time" className="navds-label">
                Tid for ulykken
              </label> */}
                  <InputMask
                    mask="99:99"
                    placeholder="00:00"
                    onChange={handleKlokkeChange}
                    value={specificTime || ''}
                    data-testid="timeframe-when-time"
                    id="timeframe-when-time"
                    className="navds-text-field__input navds-body-short navds-body-medium"
                  />
                </div>
              )}
            </div>

            {errors?.hendelsesfakta?.tid?.tidspunkt && (
              <div className="navds-error-message navds-error-message--medium navds-label">
                {errors?.hendelsesfakta?.tid?.tidspunkt?.message}
              </div>
            )}
          </>
        )}

        {timeType === 'Periode' && (
          <>
            <div>
              <Controller
                name="hendelsesfakta.tid.perioder"
                control={control}
                render={({ field: { onChange } }) => (
                  <Tidsperioder
                    perioder={state.hendelsesfakta.tid.perioder || []}
                    onTidsperioderChange={(perioder) => {
                      onChange(perioder);
                    }}
                  />
                )}
              />
              {errors?.hendelsesfakta?.tid?.perioder && (
                <span className="navds-error-message navds-error-message--medium navds-label">
                  Periode er påkrevd
                </span>
              )}
            </div>
            <div className="spacer">
              <Label>Når ble sykdommen påvist?</Label>
              <ReadMore
                className="spacer-top"
                size="medium"
                header="Grunnen til at vi spør om dette"
              >
                Dersom du kjenner til når sykdommen ble påvist hos lege eller
                behandler oppgir du dato, eventuelt sett det til første i
                kalendermåneden om du ikke vet helt nøyaktig dato. Denne
                opplysningen vil kunne ha betydning for den videre behandlingen
                av saken. Dersom du ikke har kjennskap til når sykdommen ble
                påvist kan du oppgi dette i fritekstfeltet på slutten av
                skjemaet.
              </ReadMore>

              <div className="dateTime-date">
                <Controller
                  name="hendelsesfakta.tid.sykdomPaavist"
                  control={control}
                  render={({ field }) => (
                    <DayPickerInput
                      classNames={{ ...whenDayPickerClassNames }}
                      placeholder="DD.MM.ÅÅÅÅ"
                      value={sicknessDate}
                      onDayChange={setSicknessDate}
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
            </div>
          </>
        )}

        {timeType === 'Ukjent' && (
          <BodyLong className="spacer">
            Husk å skrive utfyllende om dette i beskrivende felt på slutten av
            innmeldingen. For å melde yrkessykdom må vi ha en periode.
          </BodyLong>
        )}
      </div>

      {roller[rolletype] && roller[rolletype].showOrderManeuver && (
        <RadioGroup
          legend="Skjedde hendelsen under en order om manøver?"
          error={
            errors?.skadelidt?.dekningsforhold?.underOrdreOmManoever &&
            errors?.skadelidt?.dekningsforhold?.underOrdreOmManoever.message
          }
          value={manover}
          onChange={(e) => handleManoverChange(e)}
          className="spacer"
        >
          <Radio
            {...register('skadelidt.dekningsforhold.underOrdreOmManoever', {
              required: 'Dette feltet er påkrevd',
            })}
            value="Ja"
          >
            Ja
          </Radio>
          <Radio
            {...register('skadelidt.dekningsforhold.underOrdreOmManoever', {
              required: 'Dette feltet er påkrevd',
            })}
            value="Nei"
          >
            Nei
          </Radio>
        </RadioGroup>
      )}

      {
        roller[rolletype] &&
        roller[rolletype].showTimeframeWhenInjuredPeriod && (
          <Select
            className="spacer"
            {...register('hendelsesfakta.naarSkjeddeUlykken')}
            error={
              errors?.hendelsesfakta?.naarSkjeddeUlykken &&
              errors?.hendelsesfakta?.naarSkjeddeUlykken.message
            }
            label="Innenfor hvilket tidsrom inntraff skaden?"
            data-testid="timeframe-period-options"
          >
            <option hidden value=""></option>
            {tidsromkoder &&
              Object.keys(tidsromkoder).map(
                (tidsromkode: string, index: number) => {
                  return (
                    <option
                      key={encodeURIComponent(tidsromkode)}
                      value={tidsromkode}
                    >
                      {tidsromkoder[tidsromkode]?.verdi}
                    </option>
                  );
                }
              )}
          </Select>
        )}
    </>
  );
};
export default TimeframeForm;
