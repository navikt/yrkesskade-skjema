// import { IGeneralForm } from '../Interfaces/generalForm';
import { GlobalState } from 'little-state-machine';

export default function formUpdateAction(state: GlobalState, payload: any) {
  return {
    ...state,
    hendelsesfakta: { ...state.hendelsesfakta, ...payload.hendelsesfakta },
    skade: { ...state.skade, ...payload.skade },
    skadelidt: { ...state.skadelidt, ...payload.skadelidt },
    innmelder: { ...state.innmelder, ...payload.innmelder }
  };
}
