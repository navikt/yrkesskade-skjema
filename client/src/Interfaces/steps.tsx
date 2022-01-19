export interface IStep {
  step: number;
  text: string;
  done: boolean;
  active: boolean;
}

export interface ISteps extends Array<IStep>{}
