import React, { ReactNode } from 'react';

import ReactSelect, { StylesConfig, OptionProps } from 'react-select';
import Creatable from 'react-select/creatable';
import styled from 'styled-components';

// import navFarger from 'nav-frontend-core';
// import { Label } from 'nav-frontend-skjema';
// import *  from '@navikt/ds-css';
import { Label } from '@navikt/ds-react';
import { Feilmelding } from 'nav-frontend-typografi';

export interface IProps
  extends <{ label: string; value: string }, true | false> {
  erLesevisning?: boolean;
  creatable?: boolean;
  label: ReactNode;
  feil?: ReactNode;
  propSelectStyles?: StylesConfig;
}

const Container = styled.div`
  margin-bottom: 1rem;
`;

const navSelectStyles = (
  feil?: ReactNode,
  erLesevisning?: boolean
): StylesConfig => ({
  control: (provided, state) => ({
    ...provided,
    border:
      feil && !state.isFocused
        ? `1px solid var(--navds-semantic-color-feedback-danger-border);
        `
        : `1px solid var(--navds-semantic-color-border);
        `,
    borderRadius: '4px',
    boxShadow: state.isFocused
      ? `0 0 0 3px var(--navds-semantic-color-focus);
      `
      : feil
      ? `0 0 0 1px var(--navds-semantic-color-feedback-danger-border);`
      : '',
    ':hover': {
      border: `1px solid var(--navds-semantic-color-interaction-primary-hover-subtle);
      `,
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: `var(--navds-semantic-color-border)`,
  }),
  dropdownIndicator: (provided) =>
    erLesevisning
      ? { display: 'none' }
      : {
          ...provided,
          color: 'initial',
          ':hover': {
            color: 'initial',
          },
        },
  clearIndicator: (provided) =>
    erLesevisning
      ? { display: 'none' }
      : {
          ...provided,
          color: 'var(--navds-semantic-color-border)',
          ':hover': {
            color: 'var(--navds-global-color-gray-800)',
          },
        },
  multiValue: (provided, _) => ({
    ...provided,
    backgroundColor: 'var(--navds-global-color-blue-400)',
    maxWidth: '18rem',
  }),
  multiValueRemove: (provided) =>
    erLesevisning
      ? { display: 'none' }
      : {
          ...provided,
          ':hover': {
            backgroundColor: 'var(--navds-semantic-color-focus)',
            color: 'white',
          },
        },
});

const StyledFeilmelding = styled(Feilmelding)`
  margin-top: 0.5rem;
`;

export type OptionType = {
  value: string;
  label: string;
};

export interface ISelectOption extends OptionType {
  value: string;
  label: string;
}

export const MultiSelect: React.FC<IProps> = ({
  erLesevisning,
  creatable = false,
  label,
  value,
  feil,
  propSelectStyles,
  ...props
}) => {
  const id = `react-select-${label}`;

  const hentSelectProps = () => ({
    styles: {
      ...navSelectStyles(feil, erLesevisning),
      ...propSelectStyles,
    },
    id: id,
    isDisabled: erLesevisning,
    isClearable: !erLesevisning,
    value,
    placeholder: 'Velg',
    noOptionsMessage: () => 'Ingen valg',
    ...props,
  });

  return (
    <Container>
      {typeof label === 'string' ? <Label htmlFor={id}>{label}</Label> : label}
      {creatable ? (
        <Creatable
          formatCreateLabel={(value) => `Opprett "${value}"`}
          {...hentSelectProps()}
        />
      ) : (
        <ReactSelect {...hentSelectProps()} />
      )}

      {feil && <StyledFeilmelding>{feil}</StyledFeilmelding>}
    </Container>
  );
};
