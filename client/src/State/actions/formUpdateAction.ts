// import { IGeneralForm } from '../Interfaces/generalForm';
import { GlobalState } from 'little-state-machine';
// import _ from 'lodash';
import { merge } from 'lodash';

export default function formUpdateAction(state: GlobalState, payload: any) {
  console.log('form update action');

  return {
    ...state,
    hendelsesfakta: merge(state.hendelsesfakta, payload.hendelsesfakta),
    skade: merge(state.skade, payload.skade),
    skadelidt: merge(state.skadelidt, payload.skadelidt),
    innmelder: merge(state.innmelder, payload.innmelder),
  };
}
