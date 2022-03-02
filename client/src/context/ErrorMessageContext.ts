import { useState } from 'react';
import createUseContext from 'constate';

const [ErrorMessageProvider, useErrorMessageContext] = createUseContext(() => {
  const [error, setError] = useState<String | null>(null);

  return {
    error,
    setError
  }
});

export { ErrorMessageProvider, useErrorMessageContext };
