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
  const skademelding = useAppSelector((state) => selectSkademelding(state));
  const [rolletype] = useState<string>(skademelding.skadelidt?.dekningsforhold.rolletype || '');
  const erPeriode = skademelding?.hendelsesfakta?.tid?.tidstype === 'Periode';
  return (
    <>
      Oppgi informasjon som du mener kan ha betydning for saken. Det kan være
      nyttig for oss å vite mer om:
      <ul>
        <li>Hendelsesforløpet</li>
        <li>Spesielle omstendigheter</li>
        {rolletype.toLowerCase() !== 'elev' &&  <li>Avvik fra normale arbeidsoppgaver</li> }
        <li>Skadelig påvirkning av stoffer</li>
        <li>
          Umiddelbar behandling av skaden/sykdommen hvis det er kjent,
          førstehjelp, debrifing eller legevakt/sykehus.
        </li>
        {erPeriode && (
          <>
          <li>Hva bestod arbeidet/aktiviteten i da påvirkningen fant sted</li>
          <li>De skadelige stoffene eller påvirkningen</li>
          <li>Første kjente behandling av skaden/sykdommen</li>
          </>
        )}
      </ul>
    </>
  );
};
