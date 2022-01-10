// import React, { useEffect, useState } from "react";
// import "./Sak.less";
import { Heading, Button, ContentContainer, Grid, Cell } from "@navikt/ds-react";
// import { SkjemaGruppe, Input } from "nav-frontend-skjema";
// import { Hovedknapp } from "nav-frontend-knapper";
import { useNavigate } from "react-router-dom";
// import getTexts from '../../utils/getTexts.js';
import axios from "axios";
import {IGeneralForm} from '../../Interfaces/generalForm';
interface IProps {
  data?: IGeneralForm | undefined;
}
const Summary = (props: IProps) => {
  console.log(props.data);
  const navigate = useNavigate();
  const handleSending = async () => {
    try {
      await axios.post("/api/skademelding", { ...props.data });
      navigate("/yrkesskade/skjema/kvittering");
    } catch {
      navigate("/yrkesskade/skjema/feilmelding");
    }
  };
  return (
    <ContentContainer>
      <Grid>
        <Cell xs={12}>
          <Heading size="2xlarge" className="pageTitle">
            Oppsumering
          </Heading>
        </Cell>
        <Cell xs={12} lg={6} className="grid-centered--lg">

        </Cell>
        <Cell xs={12} lg={6} className="grid-centered--lg">
          <Button onClick={handleSending}>Send inn</Button>
        </Cell>
      </Grid>
    </ContentContainer>
  );
};
export default Summary;
