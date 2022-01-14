import { Select } from "@navikt/ds-react";
import { accidentType, accidentBackground } from "../../../assets/injuryEnums";

interface IProps {
  register: any;
  errors: any;
}
const AccidentForm = ({ register, errors }: IProps) => {
  return (
    <>
      <Select
        {...register("skade.alvorlighetsgrad", {
          required: true,
        })}
        label="Hvor alvorlig er ulykken"
        error={
          errors?.skade?.alvorlighetsgrad &&
          "Dette feltet er påkrevd"
        }
      >
        <option value="">Velg</option>
        <option value="Veldig">Veldig</option>
      </Select>

      <Select
        label="Skjedde ulykken på arbeidsplassen?"
        {...register(
          "hendelsesfakta.hvorSkjeddeUlykken",
          {
            required: true,
          }
        )}
        error={
          errors?.hendelsesfakta?.hvorSkjeddeUlykken &&
          "Dette feltet er påkrevd"
        }
      >
        <option value="1">Ja</option>
        <option value="0">Nei</option>
      </Select>

      <Select
        label="Hva var årsaken til ulykken"
        {...register("hendelsesfakta.typeUlykkeTabellA", { required: true })}
        error={
          errors?.hendelsesfakta?.typeUlykkeTabellA && "Dette feltet er påkrevd"
        }
      >
        <option value="">Velg</option>
        {(Object.keys(accidentType) as Array<keyof typeof accidentType>).map(
          (key) => {
            return (
              <option key={key} value={accidentType[key]}>
                {accidentType[key]}
              </option>
            );
          }
        )}
      </Select>

      <Select
        label="Hva var bakgrunnen for ulykken"
        {...register("hendelsesfakta.bakgrunnsaarsakTabellB", { required: true })}
        error={
          errors?.hendelsesfakta?.bakgrunnsaarsakTabellB && "Dette feltet er påkrevd"
        }
      >
        <option value="">Velg</option>
        {(
          Object.keys(accidentBackground) as Array<
            keyof typeof accidentBackground
          >
        ).map((key) => {
          return (
            <option key={key} value={accidentBackground[key]}>
              {accidentBackground[key]}
            </option>
          );
        })}
      </Select>
    </>
  );
};

export default AccidentForm;