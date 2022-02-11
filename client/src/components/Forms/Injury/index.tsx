import { useState, useEffect } from 'react';
import { Select, RadioGroup, Textarea, Table, Button } from '@navikt/ds-react';
import { injuredBodypart, injuryType } from '../../../assets/injuryEnums';
import { isEmpty } from 'ramda';
import { AddCircle } from '@navikt/ds-icons';

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
  const [freetext, setFreetext] = useState('');
  const [injury, setInjury] = useState<{}[]>([]);

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

      <Select
        label="Hva slags skade er det"
        {...register('skade.skadeartTabellC', {
          required: isEmpty(injury) && 'Dette feltet er påkrevd',
        })}
        className="spacer"
        error={errors?.skade?.skadeartTabellC && 'Dette feltet er påkrevd'}
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

      <Button variant="tertiary" onClick={handleMultipleIjurys}>
        <AddCircle />
        Legg til flere skader
      </Button>

      {!isEmpty(injury) && (
        <Table className="spacer">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Område</Table.HeaderCell>
              <Table.HeaderCell>Skade</Table.HeaderCell>
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
                  </Table.Row>
                );
              }
            )}
          </Table.Body>
        </Table>
      )}

      <RadioGroup
        legend="Har lege blitt kontaktet?"
        error={
          errors?.skade?.legeKontaktet && errors?.skade?.legeKontaktet.message
        }
        className="spacer"
      >
        <div className="navds-radio navds-radio--medium">
          <input
            type="radio"
            className="navds-radio__input"
            {...register('skade.legeKontaktet', {
              required: 'Dette feltet er påkrevd',
            })}
            value="Ja"
            data-testid="injury-medical-contacted-yes-option"
            id="lege-ja"
          />
          <label htmlFor="lege-ja" className="navds-radio__label">
            Ja
          </label>
        </div>
        <div className="navds-radio navds-radio--medium">
          <input
            type="radio"
            className="navds-radio__input"
            {...register('skade.legeKontaktet', {
              required: 'Dette feltet er påkrevd',
            })}
            value="Nei"
            data-testid="injury-medical-contacted-no-option"
            id="lege-nei"
          />
          <label htmlFor="lege-nei" className="navds-radio__label">
            Nei
          </label>
        </div>
        <div className="navds-radio navds-radio--medium">
          <input
            type="radio"
            className="navds-radio__input"
            {...register('skade.legeKontaktet', {
              required: 'Dette feltet er påkrevd',
            })}
            value="Vet ikke"
            data-testid="injury-medical-contacted-unknown-option"
            id="lege-unknown"
          />
          <label htmlFor="lege-unknown" className="navds-radio__label">
            Vet ikke
          </label>
        </div>
      </RadioGroup>
      <Textarea
        className="spacer"
        label="Utfyllende beskrivelse"
        description={<TextareaDescription />}
        {...register('hendelsesfakta.utfyllendeBeskrivelse')}
        value={freetext}
        maxLength={1000}
        onChange={(e) => setFreetext(e.target.value)}
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
