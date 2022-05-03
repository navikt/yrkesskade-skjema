import { logAmplitudeEvent } from '../../utils/analytics/amplitude';
import { logMessage } from '../../utils/logging';
import { reset } from '../reducers/skademelding.reducer';
import { useAppDispatch } from './state.hooks';

export const useCancel = () => {
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    logMessage('Brukeren har avsluttet innsending av skademelding');
    logAmplitudeEvent('skademelding.innmelding', { status: 'avbrutt' });

    dispatch(reset());
    window.location.href = 'https://nav.no';
  };

  return handleCancel;
};
