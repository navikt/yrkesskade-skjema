import { TextField } from '@navikt/ds-react';
import './Address.less';

interface IProps {
  register: any;
  errors: any;
  control: any;
}
const Address = ({ register, errors, control }: IProps) => {

  return (
    <>
      <TextField
        className="spacer"
        {...register('hendelsesfakta.ulykkessted.adresse.adresselinje1', {
          required: 'Dette feltet er påkrevd',
        })}
        label="Adresse"
        type="text"
        data-testid="injury-location-address"
        error={
          errors?.hendelsesfakta?.ulykkessted
            .adresse.adresselinje1 &&
          errors?.hendelsesfakta?.ulykkessted
            .adresse.adresselinje1.message
        }
      />
      <div className="postalcode-and-place">
        <TextField
          className="postal-code"
          {...register('hendelsesfakta.ulykkessted.adresse.postkode', {
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
            errors?.hendelsesfakta?.ulykkessted
              .adresse.postkode &&
            errors?.hendelsesfakta?.ulykkessted
              .adresse.postkode.message
          }
        />
        <TextField
          className="city"
          {...register('hendelsesfakta.ulykkessted.adresse.poststed', {
            required: 'Dette feltet er påkrevd',
          })}
          label="Poststed"
          type="text"
          data-testid="injury-location-place"
          error={
            errors?.hendelsesfakta?.ulykkessted
              .adresse.poststed &&
            errors?.hendelsesfakta?.ulykkessted
              .adresse.poststed.message
          }
        />
      </div>
    </>
  );
};

export default Address;
