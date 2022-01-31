// import { IGeneralForm } from '../Interfaces/generalForm';
export default function formUpdateAction(state: any, payload: any) {
  return {
    ...state,
    hendelsesfakta: { ...state.hendelsesfakta, ...payload.hendelsesfakta},
    skade: { ...state.skade, ...payload.skade},
    skadelidt: { ...state.skadelidt, ...payload.skadelidt},
    innmelder: { ...state.innmelder, ...payload.innmelder}
  };
}
