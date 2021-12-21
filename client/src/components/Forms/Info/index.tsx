import { TextField, Fieldset } from "@navikt/ds-react";

const FormInfo = () => {
  return (
    <Fieldset legend="Vi trenger litt info om deg">
      <TextField label="Fornavn" />
      <TextField label="Etternavn" />
      <TextField label="Fødselsnummer" type="number" />
    </Fieldset>
  );
};

export default FormInfo;
