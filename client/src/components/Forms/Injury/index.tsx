import { useState, useEffect } from 'react';
import { Select, RadioGroup, Table, Button } from '@navikt/ds-react';
import { injuredBodypart, injuryType } from '../../../assets/injuryEnums';
import { isEmpty, remove } from 'ramda';
import { AddCircle, MinusCircle } from '@navikt/ds-icons';
import { useStateMachine } from 'little-state-machine';
import antattSykefravaerTabellH from '../../../assets/Lists/antattSykefravaerTabellH';

interface IProps {
  register: any;
  errors: any;
  getValues: any;
  reset: any;
  setValue: any;
}
const InjuryForm = ({
  register,
  errors,
  getValues,
  reset,
  setValue,
}: IProps) => {
  const { state } = useStateMachine();
  const [injury, setInjury] = useState<{}[]>(state.skade.skadedeDeler);

  const removeInjury = (index: number) => {
    setInjury(remove(index, 1, injury));
  };

  const handleMultipleIjurys = () => {
    const bodypart = getValues('skade.kroppsdelTabellD');
    const damage = getValues('skade.skadeartTabellC');
    if (!isEmpty(bodypart) && !isEmpty(damage)) {
      setInjury((injury) => [
        ...injury,
        { skadeartTabellC: damage, kroppsdelTabellD: bodypart },
      ]);
      reset('skade.kroppsdelTabellD');
      reset('skade.skadeartTabellC');
    }
  };

  useEffect(() => {
    setValue('skade.skadedeDeler', injury);
  }, [injury, setValue]);

  return (
    <>
      <div>
        <Select
          className="spacer"
          label="Hvor på kroppen er skaden"
          description="Husk å trykke på legg til skade før du går videre"
          {...register('skade.kroppsdelTabellD', {
            required: isEmpty(injury) && 'Dette feltet er påkrevd',
          })}
          error={errors?.skade?.kroppsdelTabellD && 'Dette feltet er påkrevd'}
          data-testid="injury-body-location-options"
        >
          <option hidden value=""></option>
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

        <Select
          label="Hva slags skade er det"
          {...register('skade.skadeartTabellC', {
            required: isEmpty(injury) && 'Dette feltet er påkrevd',
          })}
          className="spacer"
          error={errors?.skade?.skadeartTabellC && 'Dette feltet er påkrevd'}
          data-testid="injury-type-options"
        >
          <option hidden value=""></option>
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

        <Button variant="tertiary" onClick={handleMultipleIjurys}>
          <AddCircle />
          Legg til skade
        </Button>

        {!isEmpty(injury) && (
          <Table className="spacer">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Område</Table.HeaderCell>
                <Table.HeaderCell>Skade</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {injury.map(
                // (item: { damage?: string; bodypart?: string }, index: number) => {
                (item: any, index: number) => {
                  return (
                    <Table.Row key={index}>
                      <Table.DataCell>{item.kroppsdelTabellD}</Table.DataCell>
                      <Table.DataCell>{item.skadeartTabellC}</Table.DataCell>
                      <Table.DataCell>
                        <Button
                          variant="tertiary"
                          onClick={() => removeInjury(index)}
                        >
                          <MinusCircle />
                        </Button>
                      </Table.DataCell>
                    </Table.Row>
                  );
                }
              )}
            </Table.Body>
          </Table>
        )}
      </div>

      <RadioGroup
        legend="Har den skadelidte hatt fravær?"
        error={
          errors?.skade?.antattSykefravaerTabellH &&
          errors?.skade?.antattSykefravaerTabellH.message
        }
        className="spacer"
      >
        { antattSykefravaerTabellH.map((verdi, index) => (
          <div className="navds-radio navds-radio--medium" key={verdi.value}>
          <input
            type="radio"
            className="navds-radio__input"
            {...register('skade.antattSykefravaerTabellH', {
              required: 'Dette feltet er påkrevd',
            })}
            value={verdi.value}
            data-testid={`injury-absence-${index}`}
            id={`injury-absence-${index}`}
          />
          <label
            htmlFor={`injury-absence-${index}`}
            className="navds-radio__label"
          >
            {verdi.value}
          </label>
        </div>
        ))

      }
    </RadioGroup>
   </>
  );
};

export default InjuryForm;
