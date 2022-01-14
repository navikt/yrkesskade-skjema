import { RadioGroup, Radio } from "@navikt/ds-react";

interface IProps {
  register: any;
  errors: any;
}
const CompanyForm = ({ register }: IProps) => {
  return (
    <>
      <RadioGroup legend="Er dette bedriften du melder for?">
        <Radio value="Ja" data-testid="company-option-yes">Ja</Radio>
        <Radio value="Nei" data-testid="company-option-no">Nei</Radio>
      </RadioGroup>
    </>
  );
};

export default CompanyForm;
