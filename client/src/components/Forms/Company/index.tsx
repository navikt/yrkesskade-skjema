import { RadioGroup, Radio } from '@navikt/ds-react';

interface IProps {
  register: any;
  errors: any;
}
const CompanyForm = ({ register, errors }: IProps) => {
  return (
    <>
      <RadioGroup
      className="spacer"
        legend="Er dette bedriften du melder for?"
        // error={errors?.companyOption && 'Dette feltet er påkrevd'}
      >
        <Radio
          // {...register('companyOption', { required: true })}
          value="Ja"
          data-testid="company-option-yes"
        >
          Ja
        </Radio>
        <Radio
          // {...register('companyOption', { required: true })}
          value="Nei"
          data-testid="company-option-no"
        >
          Nei
        </Radio>
      </RadioGroup>
    </>
  );
};

export default CompanyForm;
