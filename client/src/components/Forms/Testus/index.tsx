import { TextField, Fieldset } from "@navikt/ds-react";

interface IProps {
  register: any;
}
const FormTest = ({ register }: IProps) => {

  return (
    <Fieldset legend="Vi trenger litt mer info">
      <TextField {...register("test", { required: true })} label="Test" />
    </Fieldset>
  );
};

export default FormTest;
