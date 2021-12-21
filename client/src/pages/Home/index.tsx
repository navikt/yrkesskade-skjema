import React from "react";
import "./Home.less";
import FormInfo from '../../components/Forms/Info';
import { Heading, ContentContainer, Grid, Cell, Button } from "@navikt/ds-react";
// import getTexts from '../../utils/getTexts.js';
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom';

interface ISimpleForm {
  fornavn: string,
  etternavn: string,
  fødselsnummer: number
}

const Home = () => {
  let navigate = useNavigate();
  const {
    handleSubmit,
  } = useForm<ISimpleForm>();
  const handlePrev = () => {
    navigate('https://nav.no');
  }
  const onSubmit = () => {
    navigate('oppsumering');
  }
  return (
    <>
      <ContentContainer>
        <Grid>
          <Cell xs={12}>
            <Heading size="2xlarge" className="pageTitle">
              {/* {getTexts('indexTitle')} */}
              Send inn din yrkesskade
            </Heading>
          </Cell>
          <Cell xs={12} sm={6} lg={4}>
            <FormInfo />
          </Cell>
          <Cell xs={12} sm={12} lg={12}>
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
      {/* <Heading size="2xlarge" className="pageTitle">
        {getTexts('indexTitle')}
        Send inn din yrkesskade
      </Heading>
  */}
      {/* <GuidePanel poster> */}
      {/* {getTexts( "indexDescription")} */}
      {/* daba */}
      {/* </GuidePanel> */}
      {/* <SkjemaGruppe
        className="loginForm"
        legend="For å sende inn skademelding må du logge deg på. Foreløpig ingen innlogg"
      >
        <Input placeholder="Innmelders ID" type="number" bredde="L" />
        <Hovedknapp onClick={handleLoginSubmit}>Logg inn</Hovedknapp>
      </SkjemaGruppe> */}
    </>
  );
};
export default Home;
