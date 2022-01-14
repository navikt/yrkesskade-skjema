import { Select, TextField } from "@navikt/ds-react";
interface IProps {
  register: any;
  errors: any;
}
const InjuredForm = ({ register, errors }: IProps) => {
  console.log(errors);
  return (
    <>
      <Select
        label="Hva er den skadeliteds rolle"
        {...register("skadelidt.arbeidsforhold.rolletype", {
          required: true,
        })}
        error={errors?.skadelidt?.arbeidsforhold?.rolletype && "Dette feltet er påkrevd"}
        data-testid="injured-role-options"
      >
        <option value="">Velg</option>
        <option value="Rolle">Rolle</option>
      </Select>
      <TextField
        label="Hva er skadeliteds stilling"
        {...register("skadelidt.arbeidsforhold.stillingstittel", {
          required: true,
        })}
        error={errors?.skadelidt?.arbeidsforhold?.stillingstittel && "Dette feltet er påkrevd"}
        data-testid="injured-position"
      />

      <TextField
        {...register("skadelidt.foedselsnummer", {
          required: true,
          minLength: 11,
          maxLength: 11,
        })}
        label="Fyll ut fødselsnummer på den skadelidte"
        type="number"
        error={errors?.skadelidt?.foedselsnummer && "Dette feltet er påkrevd"}
        data-testid="injured-id-number"
      />
    </>
  );
};

export default InjuredForm;
