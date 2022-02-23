import {
  Select as NAVSelect,
  RadioGroup,
  Label,
  BodyShort,
} from '@navikt/ds-react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { useSelectedCompany } from '../../../context/SelectedCompanyContext';

// import { accidentType, accidentBackground } from '../../../assets/injuryEnums';
// import alvorlighetsgrad from '../../../assets/alvorlighetsgrad';
import ulykkessted from '../../../assets/Lists/ulykkessted';
import stedstype from '../../../assets/Lists/stedstype';
import aarsakUlykkeTabellAogE from '../../../assets/Lists/aarsakUlykkeTabellAogE';
import bakgrunnsaarsakTabellBogG from '../../../assets/Lists/bakgrunnsaarsakTabellBogG';
import { useStateMachine } from 'little-state-machine';

interface IProps {
  register: any;
  errors: any;
  control: any;
}
const AccidentForm = ({ register, errors, control }: IProps) => {
  const { state } = useStateMachine();
  const { selectedAddress } = useSelectedCompany();
  return (
    <>
      <div>
        <Label spacing>Adresse</Label>
        <BodyShort data-test-id="injury-street-address">
          {selectedAddress?.adresser[0]}
        </BodyShort>
        <BodyShort data-test-id="injury-postal-code-place">
          {selectedAddress?.postnummer} {selectedAddress?.poststed}
        </BodyShort>
      </div>

      <RadioGroup
        className="spacer"
        legend="Skjedde ulykken på samme adresse?"
        error={
          errors?.hendelsesfakta?.ulykkessted?.sammeSomVirksomhetensAdresse &&
          errors?.hendelsesfakta?.ulykkessted.sammeSomVirksomhetensAdresse
            .message
        }
      >
        <div className="navds-radio navds-radio--medium">
          <input
            type="radio"
            className="navds-radio__input"
            {...register(
              'hendelsesfakta.ulykkessted.sammeSomVirksomhetensAdresse',
              {
                required: 'Dette feltet er påkrevd',
              }
            )}
            value={true}
            data-testid="accident-place-yes"
            id="accident-place-yes"
          />
          <label htmlFor="accident-place-yes" className="navds-radio__label">
            Ja
          </label>
        </div>

        <div className="navds-radio navds-radio--medium">
          <input
            type="radio"
            className="navds-radio__input"
            {...register(
              'hendelsesfakta.ulykkessted.sammeSomVirksomhetensAdresse',
              {
                required: 'Dette feltet er påkrevd',
              }
            )}
            value={false}
            data-testid="accident-place-no"
            id="accident-place-no"
          />
          <label htmlFor="accident-place-no" className="navds-radio__label">
            Nei
          </label>
        </div>
      </RadioGroup>

      <RadioGroup
        className="spacer"
        legend="Hvor alvorlig var hendelsen? (Valgfritt)"
        error={
          errors?.skade?.alvorlighetsgrad &&
          errors?.skade?.alvorlighetsgrad.message
        }
      >
        <div className="navds-radio navds-radio--medium">
          <input
            type="radio"
            className="navds-radio__input"
            {...register('skade.alvorlighetsgrad')}
            value="Alvorlig kreftsykdom"
            data-testid="injury-severity-no-medical"
            id="injury-severity-no-medical"
          />
          <label
            htmlFor="injury-severity-no-medical"
            className="navds-radio__label"
          >
            Helsehjelp antatt ikke oppsøkt
          </label>
        </div>

        <div className="navds-radio navds-radio--medium">
          <input
            type="radio"
            className="navds-radio__input"
            {...register('skade.alvorlighetsgrad')}
            value="Alvorlig kreftsykdom"
            data-testid="injury-severity-medical"
            id="injury-severity-medical"
          />
          <label
            htmlFor="injury-severity-medical"
            className="navds-radio__label"
          >
            Helsehjelp antatt oppsøkt
          </label>
        </div>

        <div className="navds-radio navds-radio--medium">
          <input
            type="radio"
            className="navds-radio__input"
            {...register('skade.alvorlighetsgrad')}
            value="Alvorlig kreftsykdom"
            data-testid="injury-severity-cancer"
            id="injury-severity-cancer"
          />
          <label
            htmlFor="injury-severity-cancer"
            className="navds-radio__label"
          >
            Alvorlig kreftsykdom
          </label>
        </div>

        <div className="navds-radio navds-radio--medium">
          <input
            type="radio"
            className="navds-radio__input"
            {...register('skade.alvorlighetsgrad')}
            value="Andre livstruende sykdom/skade"
            data-testid="injury-severity-deadly-other"
            id="injury-severity-deadly-other"
          />
          <label
            htmlFor="injury-severity-deadly-other"
            className="navds-radio__label"
          >
            Andre livstruende sykdom/skade
          </label>
        </div>

        <div className="navds-radio navds-radio--medium">
          <input
            type="radio"
            className="navds-radio__input"
            {...register('skade.alvorlighetsgrad')}
            value="Dødsfall"
            data-testid="injury-severity-death"
            id="injury-severity-death"
          />
          <label htmlFor="injury-severity-death" className="navds-radio__label">
            Dødsfall
          </label>
        </div>
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
        {ulykkessted.map((sted: { value: string; label: string }) => {
          return (
            <option key={encodeURI(sted.value)} value={sted.value}>
              {sted.label}
            </option>
          );
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
        {stedstype.map((type: { value: string; label: string }) => {
          return (
            <option key={encodeURI(type.value)} value={type.value}>
              {type.label}
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
          rules={{ required: 'Dette feltet er påkrevd' }}
          render={({ field }) => (
            <Select
              className=""
              closeMenuOnSelect={false}
              isMulti
              options={aarsakUlykkeTabellAogE}
              defaultValue={state.hendelsesfakta.aarsakUlykkeTabellAogE.map(
                (i) => {
                  return { value: i, label: i };
                }
              )}
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
          rules={{ required: 'Dette feltet er påkrevd' }}
          render={({ field }) => (
            <Select
              defaultValue={state.hendelsesfakta.bakgrunnsaarsakTabellBogG.map(
                (i) => {
                  return { value: i, label: i };
                }
              )}
              closeMenuOnSelect={false}
              isMulti
              options={bakgrunnsaarsakTabellBogG}
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
