// import React from 'react';
// import './Home.less';
// // import Bedriftsmeny from '@navikt/bedriftsmeny';
// import InjuryForm from '../../components/Forms/Injury';
// import TimeframeForm from '../../components/Forms/Timeframe';
// import AccidentForm from '../../components/Forms/Accident';
// import CompanyForm from '../../components/Forms/Company';
// import InjuredForm from '../../components/Forms/Injured';
// import {
//   ContentContainer,
//   Grid,
//   Cell,
//   Button,
//   Heading,
//   // Link
// } from '@navikt/ds-react';
// import SystemHeader from '../../components/SystemHeader';
// // import getTexts from '../../utils/getTexts.js';
// import {
//   useForm,
//   SubmitHandler
// } from 'react-hook-form';
// import { IGeneralForm } from '../../Interfaces/generalForm';
// import StepIndicator from '../../components/StepIndicator';
// import { ISteps } from '../../Interfaces/steps';

// interface IProps {
//   passFormData: (data: IGeneralForm) => void;
//   steps: ISteps;
//   decreaseStep: () => void;
//   increaseStep: () => void;
// }

// const Home = ({ passFormData, steps, decreaseStep, increaseStep }: IProps) => {
const Home = () => {
//   const {
//     register,
//     handleSubmit,
//     trigger,
//     formState: { errors },
//   } = useForm<IGeneralForm>();
//   // let navigate = useNavigate();
//   // const handlePrev = () => {
//   //   navigate('https://nav.no');
//   // };
//   const onSubmit: SubmitHandler<IGeneralForm> = (data) => {
//     console.log(data);
//     passFormData(data);
//     // navigate('oppsumering');
//   };

//   // const timeframeFromFields = [
//   //   { name: 'hendelsesfakta.tid.dato', shouldFocus: true },
//   //   { name: 'hendelsesfakta.tid.tidspunkt', shouldFocus: true },
//   //   { name: 'hendelsesfakta.tid.tidstype', shouldFocus: true },
//   // ];

//   return (
//     <ContentContainer>
//       <SystemHeader />
//       <Grid>
//         <Cell xs={12} lg={2}></Cell>
//         <Cell xs={12} lg={5}>
//           <div className="cellContentContainer">
//             {steps.currentStep === 2 && (
//               <div>
//                 <Button onClick={decreaseStep} variant="tertiary">
//                   Tilbake
//                 </Button>
//                 <Heading
//                   size="2xlarge"
//                   className="pageNumberTitle spacer"
//                   data-number="2"
//                 >
//                   Om innmelder
//                 </Heading>
//                 <CompanyForm errors={errors} register={register} />
//                 <ButtonGroup
//                   trigger={trigger}
//                   triggers={[]}
//                   increaseStep={increaseStep}
//                   passFormData={passFormData}
//                   formData={}
//                 />
//               </div>
//             )}
//             {steps.currentStep === 3 && (
//               <div>
//                  <Button onClick={decreaseStep} variant="tertiary">
//                   Tilbake
//                 </Button>
//                 <Heading
//                   size="2xlarge"
//                   className="pageNumberTitle spacer"
//                   data-number="3"
//                 >
//                   Innledning
//                 </Heading>
//                 <TimeframeForm errors={errors} register={register} />
//                 <ButtonGroup
//                   increaseStep={increaseStep}
//                   trigger={trigger}
//                   triggers={[]}
//                 />
//               </div>
//             )}
//             {steps.currentStep === 4 && (
//               <div>
//                 <Button onClick={decreaseStep} variant="tertiary">
//                   Tilbake
//                 </Button>
//                 <Heading
//                   size="2xlarge"
//                   className="pageNumberTitle spacer"
//                   data-number="4"
//                 >
//                   Innledning
//                 </Heading>
//                 <InjuredForm errors={errors} register={register} />
//                 <ButtonGroup
//                   increaseStep={increaseStep}
//                   trigger={trigger}
//                   triggers={[]}
//                 />
//               </div>
//             )}
//             {steps.currentStep === 5 && (
//               <div>
//                  <Button onClick={decreaseStep} variant="tertiary">
//                   Tilbake
//                 </Button>
//                 <Heading
//                   size="2xlarge"
//                   className="pageNumberTitle spacer"
//                   data-number="5"
//                 >
//                   Innledning
//                 </Heading>
//                 <AccidentForm errors={errors} register={register} />
//                 <ButtonGroup
//                   increaseStep={increaseStep}
//                   trigger={trigger}
//                   triggers={[]}
//                 />
//               </div>
//             )}
//             {steps.currentStep === 6 && (
//               <div>
//                 <Button onClick={decreaseStep} variant="tertiary">
//                   Tilbake
//                 </Button>
//                 <Heading
//                   size="2xlarge"
//                   className="pageNumberTitle spacer"
//                   data-number="6"
//                 >
//                   Innledning
//                 </Heading>
//                 <InjuryForm errors={errors} register={register} />
//                 <ButtonGroup
//                   increaseStep={increaseStep}
//                   trigger={trigger}
//                   triggers={[]}
//                 />
//               </div>
//             )}
//             {steps.currentStep < 2 && steps.currentStep > 6 && (
//               <Heading size="large">404 - Ikke funnet</Heading>
//             )}
//           </div>
//         </Cell>
//         <Cell xs={12} sm={12} lg={2}>
//           <StepIndicator steps={steps} />
//         </Cell>
//         <Cell xs={12} lg={2}></Cell>
//       </Grid>
//     </ContentContainer>
//   );
};
export default Home;

// interface IButtonProps {
//   // decreaseStep: () => void;
//   increaseStep: () => void;
//   onSubmit: () => void;
//   triggers: any[];
//   trigger: any;
//   handleSubmit: any;

// }
// const ButtonGroup = ({ increaseStep, triggers, trigger, onSubmit, handleSubmit }: IButtonProps) => {
//   return (
//     <>
//       <Button
//         data-testid="neste-steg"
//         onClick={async () => {
//           if (triggers && triggers.length > 0) {
//             const result = await trigger(...triggers);
//             console.log(result);
//             handleSubmit(onSubmit);
//             if (result) {
//               // increaseStep();
//             }
//           } else {
//             increaseStep();
//           }
//         }}
//       >
//         Neste steg
//       </Button>
//     </>
//   );
// };
