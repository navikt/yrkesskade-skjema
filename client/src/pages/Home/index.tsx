import React from "react";
import "./Home.less";
// import Bedriftsmeny from '@navikt/bedriftsmeny';
import InjuryForm from "../../components/Forms/Injury";
import TimeframeForm from "../../components/Forms/Timeframe";
import AccidentForm from "../../components/Forms/Accident";
import FormInfo from "../../components/Forms/Info";
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

interface ISimpleForm {
  fornavn: string | undefined;
  etternavn: string | undefined;
  fødselsnummer: number | undefined;
}
interface IProps {
  passFormData: (data: ISimpleForm) => void;
}

const Home = (props: IProps) => {
  const {register, handleSubmit} = useForm<ISimpleForm>();
  let navigate = useNavigate();
  const handlePrev = () => {
    navigate("https://nav.no");
  };
  const onSubmit: SubmitHandler<ISimpleForm> = (data) => {
    props.passFormData(data);
    navigate("oppsumering");
  };

  return (
      <ContentContainer>
        {/* <Bedriftsmeny /> */}
        <SystemHeader />
        <Grid>
          <Cell xs={12} sm={6} lg={4} className="grid-centered--lg">
              <FormInfo register={register}/>
              <InjuryForm />
              <TimeframeForm />
              <AccidentForm />
          </Cell>
          <Cell xs={12} sm={12} lg={6} className="grid-centered--lg">
            <div className="buttonSection">
              <Button variant="tertiary" onClick={handlePrev}>
                Avbryt
              </Button>
              <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                Gå videre
              </Button>
            </div>
          </Cell>
        </Grid>
      </ContentContainer>
  );
};
export default Home;
