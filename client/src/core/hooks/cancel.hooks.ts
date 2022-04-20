import { useStateMachine } from 'little-state-machine';
import clearFormAction from '../../State/actions/clearAction';
import { logAmplitudeEvent } from '../../utils/analytics/amplitude';
import { logMessage } from '../../utils/logging';

export const useCancel = () => {
  const { actions } = useStateMachine({
    clearFormAction
  });

  const handleCancel = () => {
    logMessage('Brukeren har avsluttet innsending av skademelding');
    logAmplitudeEvent('skademelding.innmelding.avbrutt');

    actions.clearFormAction({});
    window.location.href = 'https://nav.no';
  };

  return handleCancel;
};
