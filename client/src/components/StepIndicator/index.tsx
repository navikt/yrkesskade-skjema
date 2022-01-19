import './StepIndicator.less';
import { BodyShort } from '@navikt/ds-react';
import { ISteps } from '../../Interfaces/steps';

interface IProps {
  steps: ISteps;
}

const StepIndicator = ({ steps }: IProps) => {
  return (
    <div className="Stepcontainer">
      <section className="step-indicator">
        {steps.map((step) => (
          <>
            <div
              key={step.step}
              className={`step step${step.step} ${
                step.active ? 'active' : ''
              } ${step.done ? 'done' : ''}`}
            >
              <div
                className={`step-icon ${step.active ? 'active' : ''} ${
                  step.done ? 'done' : ''
                }`}
              >
                {step.step}
              </div>
              <BodyShort
                className={`${step.active ? 'active' : ''} ${
                  step.done ? 'done' : ''
                }`}
              >
                {step.text}
              </BodyShort>
            </div>
            {steps.length > step.step && (
              <div
                className={`indicator-line ${step.active ? 'active' : ''} ${
                  step.done ? 'done' : ''
                }`}
              />
            )}
          </>
        ))}
        {/* <div className="step step1 done">
          <div className="step-icon">1</div>
          <BodyShort>Delivery</BodyShort>
        </div>
        <div className="indicator-line active"></div>
        <div className="step step2 active">
          <div className="step-icon">2</div>
          <BodyShort>Payment</BodyShort>
        </div>
        <div className="indicator-line"></div>
        <div className="step step3">
          <div className="step-icon">3</div>
          <BodyShort>Confirmation</BodyShort>
        </div>
        <div className="indicator-line"></div>
        <div className="step step4">
          <div className="step-icon">4</div>
          <BodyShort>Payment</BodyShort>
        </div>
        <div className="indicator-line"></div>
        <div className="step step5">
          <div className="step-icon">5</div>
          <BodyShort>Confirmation</BodyShort>
        </div> */}
      </section>
    </div>
  );
};
export default StepIndicator;
