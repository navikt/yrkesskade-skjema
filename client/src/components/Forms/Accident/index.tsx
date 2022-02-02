import { Select } from "@navikt/ds-react";
import { accidentType, accidentBackground } from "../../../assets/injuryEnums";
import alvorlighetsgrad from '../../../assets/alvorlighetsgrad';

interface IProps {
  register: any;
  errors: any;
}
const AccidentForm = ({ register, errors }: IProps) => {
  return (
    <>
      <Select
      className="spacer"
        {...register("skade.alvorlighetsgrad", {
          required: true,
        })}
        label="Hvor alvorlig er ulykken"
        error={
          errors?.skade?.alvorlighetsgrad &&
          "Dette feltet er påkrevd"
        }
        data-testid="accident-severity-options"
      >
        <option value="">Velg</option>
        {alvorlighetsgrad.map((title, index) => {
          return (
            <option key={index} value={title.value}>
              {title.label}
            </option>
          );
        })}
      </Select>

      <Select
      className="spacer"
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
        data-testid="accident-location-options"
      >
        <option value="1">Ja</option>
        <option value="0">Nei</option>
      </Select>

      <Select
      className="spacer"
        label="Hva var årsaken til ulykken"
        {...register("hendelsesfakta.typeUlykkeTabellA", { required: true })}
        error={
          errors?.hendelsesfakta?.typeUlykkeTabellA && "Dette feltet er påkrevd"
        }
        data-testid="accident-reason-options"
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
      className="spacer"
        label="Hva var bakgrunnen for ulykken"
        {...register("hendelsesfakta.bakgrunnsaarsakTabellB", { required: true })}
        error={
          errors?.hendelsesfakta?.bakgrunnsaarsakTabellB && "Dette feltet er påkrevd"
        }
        data-testid="accident-background-options"
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
