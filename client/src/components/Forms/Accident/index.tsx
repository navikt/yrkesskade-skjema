import { Select } from "@navikt/ds-react";
import { accidentType, accidentBackground } from "../../../assets/injuryEnums";

interface IProps {
  register: any;
}
const AccidentForm = ({ register }: IProps) => {
  return (
    <>
      <Select
        {...register("skade.alvorlighetsgrad")}
        label="Hvor alvorlig er ulykken"
        // error={errors?.skadelidt?.arbeidsforhold?.rolletype && "Dette feltet er påkrevd"}
      >
        <option value="">Velg</option>
        <option value="Veldig">Veldig</option>
      </Select>
      <Select label="Hvor skjedde ulykken">
        <option value="">Velg</option>
        <option value="Hjemme">Hjemme</option>
      </Select>
      <Select
        label="Hva var årsaken til ulykken"
        {...register("hendelsesfakta.typeUlykkeTabellA")}
      >
        <option value="">Velg</option>
        {(Object.keys(accidentType) as Array<keyof typeof accidentType>).map(
          (key) => {
            return (
              <option key={key} value={key}>
                {accidentType[key]}
              </option>
            );
          }
        )}
      </Select>
      <Select
        label="Hva var bakgrunnen for ulykken"
        {...register("hendelsesfakta.typeUlykkeTabellA")}
      >
        <option value="">Velg</option>
        {(
          Object.keys(accidentBackground) as Array<
            keyof typeof accidentBackground
          >
        ).map((key) => {
          return (
            <option key={key} value={key}>
              {accidentBackground[key]}
            </option>
          );
        })}
      </Select>
    </>
  );
};

export default AccidentForm;
