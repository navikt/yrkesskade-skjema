// import { IGeneralForm } from '../Interfaces/generalForm';
export default function formUpdateAction(state: any, payload: any) {
  return {
    ...state,
    ...payload
  };
}
