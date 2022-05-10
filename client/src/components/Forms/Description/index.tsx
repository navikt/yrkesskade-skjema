import { useState } from 'react';
import { Textarea } from '@navikt/ds-react';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectSkademelding } from '../../../core/reducers/skademelding.reducer';
import { Skademelding } from '../../../api/yrkesskade';
import { useFormContext } from 'react-hook-form';

const DescriptionForm = () => {
  const skademelding = useAppSelector((state) => selectSkademelding(state));
  const [freetext, setFreetext] = useState(
    skademelding.hendelsesfakta?.utfyllendeBeskrivelse || ''
  );
  const { register } = useFormContext<Skademelding>();

  return (
    <>
      <Textarea
        className="spacer"
        label="Under kan du tilføre ytterligere opplysninger."
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
      Oppgi informasjon som du mener kan ha betydning for saken. Det kan være
      nyttig for oss å vite mer om:
      <ul>
        <li>Hendelsesforløpet</li>
        <li>Spesielle omstendigheter</li>
        <li>Avvik fra normale arbeidsoppgaver</li>
        <li>Skadelig påvirkning av stoffer</li>
        <li>
          Umiddelbar behandling av skaden/sykdommen hvis det er kjent,
          førstehjelp, debrifing eller legevakt/sykehus.
        </li>
      </ul>
    </>
  );
};
