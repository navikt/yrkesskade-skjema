import { useState } from "react";
import { Select, RadioGroup, Radio, Textarea } from "@navikt/ds-react";
import { injuredBodypart, injuryType } from "../../../assets/injuryEnums";

interface IProps {
  register: any;
  errors: any;
}
const InjuryForm = ({ register, errors }: IProps) => {
  const [value, setValue] = useState("");
  return (
    <>
      <Select
        label="Hvor på kroppen er skaden"
        {...register("skade.kroppsdelTabellD", {
          required: true,
        })}
        error={
          errors?.skade?.kroppsdelTabellD &&
          "Dette feltet er påkrevd"
        }
      >
        <option value="">Velg</option>
        {(
          Object.keys(injuredBodypart) as Array<keyof typeof injuredBodypart>
        ).map((key) => {
          return (
            <option key={key} value={injuredBodypart[key]}>
              {injuredBodypart[key]}
            </option>
          );
        })}
      </Select>

      <Select label="Hva slags skade er det"  {...register("skade.skadeartTabellC", {
          required: true,
        })}
        error={
          errors?.skade?.skadeartTabellC &&
          "Dette feltet er påkrevd"
        }>
        <option value="">Velg</option>
        {(Object.keys(injuryType) as Array<keyof typeof injuryType>).map(
          (key) => {
            return (
              <option key={key} value={injuryType[key]}>
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
        description={<TextareaDescription />}
        {...register("hendelsesfakta.utfyllendeBeskrivelse")}
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
