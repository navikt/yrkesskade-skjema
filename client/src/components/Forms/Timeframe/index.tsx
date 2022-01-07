import {useState} from 'react';
import {Select, TextField, Fieldset, RadioGroup, Radio} from '@navikt/ds-react';
const TimeframeForm = () => {
  const [timeframe, setTimeframe] = useState("");
  return (
    <>
    <Fieldset legend="Når skjedde ulykken som skal meldes?">
      <TextField hideLabel label="Dato for ulykken" description="DD.MM.ÅÅÅÅ"/>
      <TextField hideLabel label="Klokkeslett for ulykken" description="00:00"/>
      <RadioGroup legend>
        <Radio value="Ukjent">Ukjent</Radio>
        <Radio value="Over en periode">Over en periode</Radio>
      </RadioGroup>
    </Fieldset>
    <Select onChange={(e) => {setTimeframe(e.target.value)}} label="Innenfor hvilket tidsrom inntraff skaden?">
      <option value="">Velg</option>
      <option value="I avtalt arbeidstid">I avtalt arbeidstid</option>
      <option value="Under permisjon">Under permisjon</option>
      <option value="Under full sykemelding">Under full sykemelding</option>
      <option value="Fritid/ privat aktivitet">Fritid/ privat aktivitet</option>
      <option value="Hvilende vakt">Hvilende vakt</option>
      <option value="Under frivillig arbeid">Under frivillig arbeid</option>
      <option value="Under redningsarbeid, vakthold eller redningsøvelse">Under redningsarbeid, vakthold eller redningsøvelse</option>
      <option value="Annet">Annet</option>
    </Select>
    {timeframe === 'Annet' && <TextField label="Annet" />}
   </>
  )
}

export default TimeframeForm;
