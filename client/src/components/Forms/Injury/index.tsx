import { useEffect, useState } from 'react';
import { RadioGroup } from '@navikt/ds-react';
import { Skademelding } from '../../../api/yrkesskade';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectKodeverk } from '../../../core/reducers/kodeverk.reducer';
import { selectSkademelding } from '../../../core/reducers/skademelding.reducer';
import { useLocation } from 'react-router';
import { Controller, useFormContext } from 'react-hook-form';
import SkadedeDeler from '../../SkadedeDeler';

import roller from '../../../utils/roller';

const InjuryForm = () => {
  const {
    formState: { errors },
    register,
    control,
    setValue,
  } = useFormContext<Skademelding>();
  const location = useLocation();
  const skademelding = useAppSelector((state) => selectSkademelding(state));
  const [rolletype] = useState<string>(
    skademelding.skadelidt?.dekningsforhold.rolletype || ''
  );

  const skadetKroppsdelkoder = useAppSelector((state) =>
    selectKodeverk(state, 'skadetKroppsdel')
  );
  const skadetypekoder = useAppSelector((state) =>
    selectKodeverk(state, 'skadetype')
  );

  const harSkadelidtHattFravaerkoder = useAppSelector((state) =>
    selectKodeverk(state, 'harSkadelidtHattFravaer')
  );

  useEffect(() => {
    setValue(
      'skade.antattSykefravaerTabellH',
      skademelding.skade?.antattSykefravaerTabellH || ''
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <Controller
        name="skade.skadedeDeler"
        control={control}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <SkadedeDeler
            onSkadededelerChange={(skadedeDeler) => {
              onChange(skadedeDeler);
            }}
            skadedeDeler={skademelding.skade?.skadedeDeler || []}
            skadeartKoder={skadetypekoder}
            kroppsdelKode={skadetKroppsdelkoder}
          />
        )}
      />
      {errors?.skade?.skadedeDeler && (
        <span className="navds-error-message navds-error-message--medium navds-label">
          Skadeart og kroppsdel er påkrevd
        </span>
      )}

      {roller[rolletype] && !roller[rolletype].isElevEllerStudent && (
      <RadioGroup
        legend="Har den skadelidte hatt fravær?"
        error={
          errors?.skade?.antattSykefravaerTabellH &&
          errors?.skade?.antattSykefravaerTabellH.message
        }
        className="spacer"
      >
        {harSkadelidtHattFravaerkoder &&
          Object.keys(harSkadelidtHattFravaerkoder).map(
            (kode: string, index: number) => (
              <div className="navds-radio navds-radio--medium" key={kode}>
                <input
                  type="radio"
                  className="navds-radio__input"
                  {...register('skade.antattSykefravaerTabellH', {
                    required: 'Dette feltet er påkrevd',
                  })}
                  value={kode}
                  data-testid={`injury-absence-${index}`}
                  id={`injury-absence-${index}`}
                />
                <label
                  htmlFor={`injury-absence-${index}`}
                  className="navds-radio__label"
                >
                  {harSkadelidtHattFravaerkoder[kode]?.verdi}
                </label>
              </div>
            )
          )}
      </RadioGroup>
      )}
    </>
  );
};

export default InjuryForm;
