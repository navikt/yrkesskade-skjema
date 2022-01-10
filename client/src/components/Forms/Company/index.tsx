import { RadioGroup, Radio } from "@navikt/ds-react";

interface IProps {
  register: any;
}
const CompanyForm = ({ register }: IProps) => {
  return (
    <>
      <RadioGroup legend="Er dette bedriften du melder for?">
        <Radio value="Ja">Ja</Radio>
        <Radio value="Nei">Nei</Radio>
      </RadioGroup>
    </>
  );
};

export default CompanyForm;
