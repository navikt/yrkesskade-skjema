import { GlobalState } from "little-state-machine";
import { initialState } from "../formState";

export default function clearFormAction(state: GlobalState, payload: any) {
  return initialState;
}
