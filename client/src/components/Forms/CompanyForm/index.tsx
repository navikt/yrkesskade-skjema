import {RadioGroup, Radio} from '@navikt/ds-react'
const CompanyForm = () => {
  return (
    <>
     <RadioGroup legend="Er dette bedriften du melder for?">
      <Radio value="Ja">Ja</Radio>
      <Radio value="Nei">Nei</Radio>
     </RadioGroup>
    </>
  )
}

export default CompanyForm;
