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
      className="spacer"
        label="Hvor på kroppen er skaden"
        {...register("skade.kroppsdelTabellD", {
          required: true,
        })}
        error={
          errors?.skade?.kroppsdelTabellD &&
          "Dette feltet er påkrevd"
        }
        data-testid="injury-body-location-options"
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
        className="spacer"
        error={
          errors?.skade?.skadeartTabellC &&
          "Dette feltet er påkrevd"
        }
        data-testid="injury-type-options"
        >
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

      <RadioGroup legend="Har lege blitt kontaktet?" error={
          errors?.skade?.legeKontaktet &&
          "Dette feltet er påkrevd"
        }
        className="spacer">
        <Radio {...register("skade.legeKontaktet", {required: true })} value="Ja" data-testid="injury-medical-contacted-yes-option">Ja</Radio>
        <Radio {...register("skade.legeKontaktet", {required: true })} value="Nei" data-testid="injury-medical-contacted-no-option">Nei</Radio>
        <Radio {...register("skade.legeKontaktet", {required: true })} value="Vet ikke" data-testid="injury-medical-contacted-unknown-option">Vet ikke</Radio>
      </RadioGroup>
      <Textarea
      className="spacer"
        label="Utfyllende beskrivelse"
        description={<TextareaDescription />}
        {...register("hendelsesfakta.utfyllendeBeskrivelse")}
        value={value}
        maxLength={1000}
        onChange={(e) => setValue(e.target.value)}
        data-testid="injury-additional-information"
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
