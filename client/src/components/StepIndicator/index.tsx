import {useState, useEffect} from 'react'
import './StepIndicator.less';
import { BodyShort } from '@navikt/ds-react';
import { ISteps } from '../../Interfaces/steps';
import check from '../../assets/icons/check.svg';
import { useLocation } from 'react-router-dom';

// interface IProps {
//   steps: ISteps;
// }

const StepIndicator = () => {
  const { pathname } = useLocation();
  const [steps, setSteps] = useState<ISteps>({
    totalSteps: 7,
    currentStep: 1,
    details: [
      {
        text: 'Innledning',
        done: false,
        active: true,
      },
      {
        text: 'Om den skadelidte',
        done: false,
        active: false,
      },
      {
        text: 'Tid og sted',
        done: false,
        active: false,
      },
      {
        text: 'Ulykkesstedet',
        done: false,
        active: false,
      },
      {
        text: 'Om ulykken',
        done: false,
        active: false,
      },
      {
        text: 'Om skaden',
        done: false,
        active: false,
      },
      {
        text: 'Utfyllende beskrivelse',
        done: false,
        active: false,
      },
      {
        text: 'Oppsummering',
        done: false,
        active: false,
      },
      {
        text: 'Kvittering',
        done: false,
        active: false,
      },
    ],
  });
  useEffect(() => {
    const updateSteps: any = (newCurrentStep: number, currentSteps: ISteps) => {
      if (newCurrentStep === currentSteps.currentStep) {
        return;
      }
      let newSteps = { ...currentSteps, currentStep: newCurrentStep };
      if (newCurrentStep > currentSteps.currentStep) {
        for (let i = 0; i < newSteps.currentStep - 1; i++) {
          newSteps.details[i].done = true;
          newSteps.details[i].active = false;
        }
        newSteps.details[newSteps.currentStep - 1].active = true;
      } else {
        let newSteps = { ...currentSteps, currentStep: newCurrentStep };
        for (let i = newSteps.details.length; i >= newSteps.currentStep; i--) {
          // newSteps.details[i - 1].done = false;
          newSteps.details[i - 1].active = false;
        }
        newSteps.details[newSteps.currentStep - 1].active = true;
      }
      setSteps(newSteps);
    };
    if (pathname.toLowerCase() === '/yrkesskade/') {
      updateSteps(1, steps);
    }
    if (pathname.toLowerCase() === '/yrkesskade/skjema/skadelidt') {
      updateSteps(2, steps);
    }
    if (pathname.toLowerCase() === '/yrkesskade/skjema/tidsrom') {
      updateSteps(3, steps);
    }
    if (pathname.toLowerCase() === '/yrkesskade/skjema/ulykkessted') {
      updateSteps(4, steps);
    }
    if (pathname.toLowerCase() === '/yrkesskade/skjema/ulykken') {
      updateSteps(5, steps);
    }
    if (pathname.toLowerCase() === '/yrkesskade/skjema/skaden') {
      updateSteps(6, steps);
    }
    if (pathname.toLowerCase() === '/yrkesskade/skjema/beskrivelse') {
      updateSteps(7, steps);
    }
    if (pathname.toLowerCase() === '/yrkesskade/skjema/oppsummering') {
      updateSteps(8, steps);
    }
    if (pathname.toLowerCase() === '/yrkesskade/skjema/kvittering') {
      updateSteps(9, steps);
    }
  }, [pathname, steps]);
  return (
    <div className="Stepcontainer no-print">
      <section className="step-indicator">
        {steps?.details.map((step, index) => (
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
