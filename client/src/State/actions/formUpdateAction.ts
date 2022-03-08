// import { IGeneralForm } from '../Interfaces/generalForm';
import { GlobalState } from 'little-state-machine';
// import _ from 'lodash';
import { merge } from 'lodash';

export default function formUpdateAction(state: GlobalState, payload: any) {
  console.log('state', state);
  console.log('payload', payload);
  // return {
  //   ...state,
  //   hendelsesfakta: { ...state.hendelsesfakta, ...payload.hendelsesfakta },
  //   skade: { ...state.skade, ...payload.skade },
  //   skadelidt: { ...state.skadelidt, ...payload.skadelidt },
  //   innmelder: { ...state.innmelder, ...payload.innmelder }
  // };
  // uftør en deep merge pga en nested state
  // return merge(get(state), payload);
  return {
    ...state,
    hendelsesfakta: merge(state.hendelsesfakta, payload.hendelsesfakta),
    skade: merge(state.skade, payload.skade),
    skadelidt: merge(state.skadelidt, payload.skadelidt),
    innmelder: merge(state.innmelder, payload.innmelder),
  };
}
