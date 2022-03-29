import { useState } from 'react';
import { Textarea } from '@navikt/ds-react';
import { useStateMachine } from 'little-state-machine';

interface IProps {
  register: any;
  errors: any;
}
const DescriptionForm = ({ register }: IProps) => {
  const { state } = useStateMachine({});
  const [freetext, setFreetext] = useState(
    state.hendelsesfakta.utfyllendeBeskrivelse
  );
  const rolletype = state.skadelidt.dekningsforhold.rolletype;
  return (
    <>
      <Textarea
        className="spacer"
        label="Under kan du tilføre ytterligere opplysninger (valgfri)"
        description={<TextareaDescription rolletype={rolletype}/>}
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

const TextareaDescription = (props: {rolletype: string}) => {
  return (
    <>
      Oppgi informasjon som du mener kan ha betydning for saken. Det kan være
      nyttig for oss å vite mer om:
      <ul>
        <li>Hendelsesforløpet</li>
        <li>Spesielle omstendigheter</li>
        {props.rolletype.toLowerCase() !== 'elev' &&  <li>Avvik fra normale arbeidsoppgaver</li> }
        <li>Skadelig påvirkning av stoffer</li>
        <li>
          Umiddelbar behandling av skaden/sykdommen hvis det er kjent,
          førstehjelp, debrifing eller legevakt/sykehus.
        </li>
      </ul>
    </>
  );
};
