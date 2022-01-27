import './StepIndicator.less';
import { BodyShort } from '@navikt/ds-react';
import { ISteps } from '../../Interfaces/steps';
import check from '../../assets/icons/check.svg';

interface IProps {
  steps: ISteps;
}

const StepIndicator = ({ steps }: IProps) => {
  return (
    <div className="Stepcontainer">
      <section className="step-indicator">
        {steps.details.map((step, index) => (
          <div key={index + 1}>
            <div
              key={index + 1}
              className={`step step${index + 1} ${
                step.active ? 'active' : ''
              } ${step.done ? 'done' : ''}`}
            >
              <div
                className={`step-icon ${step.active ? 'active' : ''} ${
                  step.done ? 'done' : ''
                }`}
              >
                {step.done ? <img alt="sjekkmerke" src={check} /> : index + 1}
              </div>
              <BodyShort
                className={`${step.active ? 'active' : ''} ${
                  step.done ? 'done' : ''
                }`}
              >
                {step.text}
              </BodyShort>
            </div>
            {steps.details.length > index + 1 && (
              <div
                className={`indicator-line ${step.active ? 'active' : ''} ${
                  step.done ? 'done' : ''
                }`}
              />
            )}
          </div>
        ))}
      </section>
    </div>
  );
};
export default StepIndicator;
