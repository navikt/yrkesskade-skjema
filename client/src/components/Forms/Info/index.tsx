import { TextField, Fieldset } from "@navikt/ds-react";

interface IProps {
  register: any;
}
const FormInfo = ({ register }: IProps) => {

  return (
    <Fieldset legend="Vi trenger litt info om deg">
      <TextField {...register("fornavn", { required: true })} label="Fornavn" />
      <TextField {...register("etternavn", { required: true })} label="Etternavn" />
      <TextField {...register("fødselsnummer", { required: true })} label="Fødselsdato" type="number" />
    </Fieldset>
  );
};

export default FormInfo;
