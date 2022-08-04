// import React, { useEffect, useState } from "react";
// import "./Sak.less";
import {
  Heading,
  ContentContainer,
  Grid,
  Cell,
  // BodyLong,
} from "@navikt/ds-react";
// import { useErrorMessageContext } from '../../context/ErrorMessageContext';
// import { SkjemaGruppe, Input } from "nav-frontend-skjema";
// import { Hovedknapp } from "nav-frontend-knapper";
// import { useHistory } from "react-router-dom";
// import getTexts from '../../utils/getTexts.js';
// import axios from "axios";

const TemporaryDown = () => {
  return (
    <ContentContainer>
      <Grid>
        <Cell xs={12}>
          <Heading size="xlarge" className="pageTitle">
            Siden er midlertidig nede grunnet feil.
          </Heading>
          </Cell>
          <Cell xs={12} lg={6} className="grid-centered--lg">
              {/* <BodyLong spacing>
                Vi jobber med å
              </BodyLong> */}
        </Cell>
      </Grid>
    </ContentContainer>
  );
};
export default TemporaryDown;
