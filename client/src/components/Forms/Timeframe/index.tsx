import { useState } from "react";
import {
  Select,
  TextField,
  Fieldset,
  RadioGroup,
  Radio,
} from "@navikt/ds-react";
interface IProps {
  register: any;
  errors: any;
}
const TimeframeForm = ({ register, errors }: IProps) => {
  const [timeframe, setTimeframe] = useState("");
  return (
    <>
      <Fieldset legend="Når skjedde ulykken som skal meldes?">
        <TextField
          {...register("hendelsesfakta.tid.dato", { required: true })}
          error={errors?.hendelsesfakta?.tid?.dato && "Dette feltet er påkrevd"}
          label="Dato for ulykken"
          description="DD.MM.ÅÅÅÅ"
          data-testid="timeframe-when-date"
          className="spacer"
        />

        <TextField
          {...register("hendelsesfakta.tid.tidspunkt", { required: true })}
          error={
            errors?.hendelsesfakta?.tid?.tidspunkt && "Dette feltet er påkrevd"
          }
          label="Klokkeslett for ulykken"
          description="00:00"
          data-testid="timeframe-when-time"
          // className="spacer"
        />

        <RadioGroup
        // className="spacer"
          legend
          error={
            errors?.hendelsesfakta?.tid?.ukjent && "Dette feltet er påkrevd"
          }
        >
          <Radio {...register("hendelsesfakta.tid.ukjent")} value="Ukjent" data-testid="timeframe-when-unknown">
            Ukjent
          </Radio>
          <Radio
            {...register("hendelsesfakta.tid.ukjent")}
            value="Over en periode"
            data-testid="timeframe-when-over-period"
          >
            Over en periode
          </Radio>
        </RadioGroup>
      </Fieldset>

      <Select
      className="spacer"
        {...register("hendelsesfakta.tid.tidstype", { required: true })}
        error={
          errors?.hendelsesfakta?.tid?.tidstype && "Dette feltet er påkrevd"
        }
        onChange={(e) => {
          setTimeframe(e.target.value);
        }}
        label="Innenfor hvilket tidsrom inntraff skaden?"
        data-testid="timeframe-period-options"
      >
        <option value="">Velg</option>
        <option value="I avtalt arbeidstid">I avtalt arbeidstid</option>
        <option value="Under permisjon">Under permisjon</option>
        <option value="Under full sykemelding">Under full sykemelding</option>
        <option value="Fritid/ privat aktivitet">
          Fritid/ privat aktivitet
        </option>
        <option value="Hvilende vakt">Hvilende vakt</option>
        <option value="Under frivillig arbeid">Under frivillig arbeid</option>
        <option value="Under redningsarbeid, vakthold eller redningsøvelse">
          Under redningsarbeid, vakthold eller redningsøvelse
        </option>
        <option value="Annet" data-testid="timeframe-period-option-other">Annet</option>
      </Select>

      {timeframe === "Annet" && (
        <TextField
        className="spacer"
          {...register("hendelsesfakta.tid.tidstypeAnnet")}
          error={
            errors?.hendelsesfakta?.tid?.tidstypeAnnet &&
            "Dette feltet er påkrevd"
          }
          label="Annet"
          data-testid="timeframe-period-option-other-text"
        />
      )}
    </>
  );
};

export default TimeframeForm;
