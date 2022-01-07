import {Select, TextField} from '@navikt/ds-react';
const InjuredForm = () => {
  return (
    <>
    <Select label="Hva er den skadeliteds rolle">
      <option value="">Velg</option>
    </Select>
    <Select label="Hva er skadeliteds stilling">
      <option value="">Velg</option>
    </Select>
    <TextField label="Fyll ut fødselsnummer på den skadelidte" type="number"></TextField>
    </>
  )
}

export default InjuredForm;
