import React from "react";
import "./Home.less";
// import Bedriftsmeny from '@navikt/bedriftsmeny';
import InjuryForm from "../../components/Forms/Injury";
import TimeframeForm from "../../components/Forms/Timeframe";
import AccidentForm from "../../components/Forms/Accident";
import CompanyForm from "../../components/Forms/Company";
import InjuredForm from "../../components/Forms/Injured";
// import FormInfo from "../../components/Forms/Info";
import {
  ContentContainer,
  Grid,
  Cell,
  Button,
} from "@navikt/ds-react";
import SystemHeader from "../../components/SystemHeader";
// import getTexts from '../../utils/getTexts.js';
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {IGeneralForm} from '../../Interfaces/generalForm';

// interface ISimpleForm {
//   fornavn: string | undefined;
//   etternavn: string | undefined;
//   fødselsnummer: number | undefined;
// }
interface IProps {
  passFormData: (data: IGeneralForm) => void;
}

const Home = (props: IProps) => {
  const {register, handleSubmit, formState: { errors },} = useForm<IGeneralForm>();
  let navigate = useNavigate();
  const handlePrev = () => {
    navigate("https://nav.no");
  };
  const onSubmit: SubmitHandler<IGeneralForm> = (data) => {
    props.passFormData(data);
    navigate("oppsumering");
  };

  return (
      <ContentContainer>
        {/* <Bedriftsmeny /> */}
        <SystemHeader />
        <Grid>
          <Cell xs={12} sm={6} lg={6} className="grid-centered--lg">
              <CompanyForm errors={errors} register={register}/>
              <TimeframeForm errors={errors} register={register}/>
              <InjuredForm errors={errors} register={register}/>
              <AccidentForm errors={errors} register={register}/>
              <InjuryForm errors={errors} register={register}/>
          </Cell>
          <Cell xs={12} sm={12} className="grid-centered--lg">
            <div className="buttonSection">
              <Button variant="tertiary" onClick={handlePrev} data-testid="form-cancel">
                Avbryt
              </Button>
              <Button variant="primary" onClick={handleSubmit(onSubmit)} data-testid="form-continue">
                Gå videre
              </Button>
            </div>
          </Cell>
        </Grid>
      </ContentContainer>
  );
};
export default Home;
