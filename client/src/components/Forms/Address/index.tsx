import { TextField, Fieldset, Select } from '@navikt/ds-react';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectKodeverk } from '../../../core/reducers/kodeverk.reducer';
import './Address.less';
interface IProps {
  register: any;
  errors: any;
  control: any;
}
const Address = ({ register, errors, control }: IProps) => {
  const landkoder = useAppSelector(state => selectKodeverk(state, 'landkoderISO2'));

  return (
    <Fieldset legend="Fyll ut adressen hvor ulykken skjedde">
      <TextField
        className=""
        {...register('hendelsesfakta.ulykkessted.adresse.adresselinje1', {
          required: 'Dette feltet er påkrevd',
        })}
        label="Adresse"
        type="text"
        data-testid="injury-location-address"
        error={
          errors?.hendelsesfakta?.ulykkessted?.adresse?.adresselinje1 &&
          errors?.hendelsesfakta?.ulykkessted?.adresse?.adresselinje1.message
        }
      />
      <div className="postalcode-and-place spacer">
        <TextField
          className="postal-code"
          {...register('hendelsesfakta.ulykkessted.adresse.adresselinje2', {
            required: 'Dette feltet er påkrevd',
            pattern: {
              value: /[0-9]/,
              message: 'Postnummer kan kun inneholde siffer'
            }
          })}
          label="Postnummer"
          type="text"
          data-testid="injury-location-postal-code"
          error={
            errors?.hendelsesfakta?.ulykkessted?.adresse?.adresselinje2 &&
            errors?.hendelsesfakta?.ulykkessted?.adresse?.adresselinje2.message
          }
        />
        <TextField
          className="city"
          {...register('hendelsesfakta.ulykkessted.adresse.adresselinje3', {
            required: 'Dette feltet er påkrevd',
          })}
          label="Poststed"
          type="text"
          data-testid="injury-location-place"
          error={
            errors?.hendelsesfakta?.ulykkessted?.adresse?.adresselinje3 &&
            errors?.hendelsesfakta?.ulykkessted?.adresse?.adresselinje3.message
          }
        />
      </div>
      { landkoder && <Select
          className="country spacer"
          {...register('hendelsesfakta.ulykkessted.adresse.land', {
            required: 'Dette feltet er påkrevd',
          })}
          label="Land"
          data-testid="injury-location-country"
          error={
            errors?.hendelsesfakta?.ulykkessted?.adresse.land &&
            errors?.hendelsesfakta?.ulykkessted?.adresse.land.message
          }
        >
        { landkoder && Object.keys(landkoder).sort((a, b) => {
           const verdiA = landkoder[a]?.verdi || 'ukjent';
           const verdiB = landkoder[b]?.verdi || 'ukjent';

          return verdiA.localeCompare(verdiB);
        }).map(landkode =>
          <option key={landkode} value={landkode}>{landkoder[landkode]?.verdi || 'UKJENT'}</option>)
        }
        </Select>
      }
    </Fieldset>
  );
};

export default Address;
