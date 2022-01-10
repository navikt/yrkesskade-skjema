import { useState } from "react";
import { Select, RadioGroup, Radio, Textarea } from "@navikt/ds-react";
import {
  injuredBodypart,
  injuryType,
} from "../../../assets/injuryEnums";

interface IProps {
  register: any;
}
const InjuryForm = ({ register }: IProps) => {
  const [value, setValue] = useState("");
  return (
    <>
      <Select label="Hvor på kroppen er skaden">
        <option value="">Velg</option>
        {(
          Object.keys(injuredBodypart) as Array<keyof typeof injuredBodypart>
        ).map((key) => {
          return (
            <option key={key} value={key}>
              {injuredBodypart[key]}
            </option>
          );
        })}
      </Select>

      <Select label="Hva slags skade er det">
        <option value="">Velg</option>
        {(Object.keys(injuryType) as Array<keyof typeof injuryType>).map(
          (key) => {
            return (
              <option key={key} value={key}>
                {injuryType[key]}
              </option>
            );
          }
        )}
      </Select>

      <button>Legg til flere skader</button>

      <RadioGroup legend="Har lege blitt kontaktet?">
        <Radio value="Ja">Ja</Radio>
        <Radio value="Nei">Nei</Radio>
        <Radio value="Vet ikke">Vet ikke</Radio>
      </RadioGroup>

      <Textarea
        label="Utfyllende beskrivelse"
        description={<TextareaDescription/>}
        value={value}
        maxLength={1000}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default InjuryForm;

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
