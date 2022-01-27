// export interface IStep {
//   step: number;
//   text: string;
//   done: boolean;
//   active: boolean;
// }
export interface ISteps {
  totalSteps: number;
  currentStep: number;
  details: { text: string; done: Boolean; active: Boolean }[];
}

// export interface ISteps extends Array<IStep> {}
