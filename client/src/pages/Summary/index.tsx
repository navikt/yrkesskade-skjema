// import React, { useEffect, useState } from "react";
// import "./Sak.less";
import { Heading, Button, ContentContainer, Grid, Cell } from "@navikt/ds-react";
// import { SkjemaGruppe, Input } from "nav-frontend-skjema";
// import { Hovedknapp } from "nav-frontend-knapper";
import { useNavigate } from "react-router-dom";
// import getTexts from '../../utils/getTexts.js';
import axios from "axios";
interface ISimpleForm {
  fornavn: string | undefined;
  etternavn: string | undefined;
  fødselsnummer: number | undefined;
  test: string | undefined;
}
interface IProps {
  data?: ISimpleForm | undefined;
}
const Summary = (props: IProps) => {
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
          <span>Fornavn: </span>
          {props?.data?.fornavn ? props.data.fornavn : ""} <br />
          <span>Etternavn: </span>{" "}
          {props?.data?.etternavn ? props.data.etternavn : ""}
          <br />
          <span>Fødselsdato: </span>{" "}
          {props?.data?.fødselsnummer ? props.data.fødselsnummer : ""}<br />
          <span>Test: </span> {props?.data?.test ? props.data.test : ""}
        </Cell>
        <Cell xs={12} lg={6} className="grid-centered--lg">
          <Button onClick={handleSending}>Send inn</Button>
        </Cell>
      </Grid>
    </ContentContainer>
  );
};
export default Summary;
