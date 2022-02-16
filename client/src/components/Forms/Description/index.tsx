import { useState } from 'react';
import {
  Textarea,
} from '@navikt/ds-react';

interface IProps {
  register: any;
  errors: any;
}
const DescriptionForm = ({
  register,
}: IProps) => {
  const [freetext, setFreetext] = useState('');

  return (
    <>
      <Textarea
        className="spacer"
        label="Noe mer å legge til? (valgfri)"
        description={<TextareaDescription />}
        {...register('hendelsesfakta.utfyllendeBeskrivelse')}
        value={freetext}
        maxLength={2000}
        onChange={(e) => setFreetext(e.target.value)}
        data-testid="injury-additional-information"
      />
    </>
  );
};

export default DescriptionForm;

const TextareaDescription = () => {
  return (
    <>
      Vi trenger opplysninger om
      <ul>
        <li>Hvordan ulykken skjedde og om skadens/sykdommens art</li>
        <li>behandlingen av skadede, behandlingstype (f.eks. førstehjelp)</li>
        <li>behandling av hvem (f.eks. lege)</li>
        <li>behandlet hvor (f.eks. på sykehus, på stedet osv.)</li>
      </ul>
    </>
  );
};
