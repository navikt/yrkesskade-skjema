import {Select} from '@navikt/ds-react';
import {
  accidentType,
  accidentBackground,
} from "../../../assets/injuryEnums";
const AccidentForm = () => {
   return (
     <>
      <Select label="Hvor alvorlig er ulykken">
        <option value="">Velg</option>
      </Select>
      <Select label="Hvor skjedde ulykken">
        <option value="">Velg</option>
      </Select>
      <Select label="Hva var årsaken til ulykken">
        <option value="">Velg</option>
        {(
          Object.keys(accidentType) as Array<keyof typeof accidentType>
        ).map((key) => {
          return (
            <option key={key} value={key}>
              {accidentType[key]}
            </option>
          );
        })}
      </Select>
      <Select label="Hva var bakgrunnen for ulykken">
        <option value="">Velg</option>
        {(
          Object.keys(accidentBackground) as Array<keyof typeof accidentBackground>
        ).map((key) => {
          return (
            <option key={key} value={key}>
              {accidentBackground[key]}
            </option>
          );
        })}
      </Select>
     </>
   )
}

export default AccidentForm;
