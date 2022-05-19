import { logErrorMessage } from './logging';

export const initWindowOnError = () => {
  window.onerror = (msg, url, lineNo, columnNo, error) => {
    const melding = `{'msg': ${JSON.stringify(
      msg
    )}, 'url': ${url}, 'lineNo': ${lineNo}, 'columnNo': ${columnNo}, 'error': ${JSON.stringify(
      error
    )}}`;

    logErrorMessage(melding);
  };
};
