// import React, { useEffect, useState } from "react";
// import "./Sak.less";
import {
  Heading,
  ContentContainer,
  Grid,
  Cell,
  BodyLong,
} from "@navikt/ds-react";
import { useLocation } from "react-router";
// import { SkjemaGruppe, Input } from "nav-frontend-skjema";
// import { Hovedknapp } from "nav-frontend-knapper";
// import { useHistory } from "react-router-dom";
// import getTexts from '../../utils/getTexts.js';
// import axios from "axios";

const Receipt = () => {
  const { state } = useLocation();
  const error = state as String;

  return (
    <ContentContainer>
      <Grid>
        <Cell xs={12}>
          <Heading size="xlarge" className="pageTitle">
            Dette gikk ikke så bra
          </Heading>
          </Cell>
          <Cell xs={12} lg={6} className="grid-centered--lg">
            { error ? (
              <BodyLong spacing>
                { error }
              </BodyLong>) : (
              <BodyLong spacing>
                Ullamco ut laboris irure excepteur velit nisi occaecat proident.
                Amet aliquip dolor eu occaecat. Elit sunt occaecat excepteur ea.
                Quis commodo adipisicing laborum minim. Culpa duis occaecat
                adipisicing dolor sint cillum. Non in consequat ex esse exercitation
                cillum Lorem voluptate officia.
              </BodyLong>
            )}
        </Cell>
      </Grid>
    </ContentContainer>
  );
};
export default Receipt;
