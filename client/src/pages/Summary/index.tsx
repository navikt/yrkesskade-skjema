// import React, { useEffect, useState } from "react";
// import "./Sak.less";
import { Heading, Button } from "@navikt/ds-react";
// import { SkjemaGruppe, Input } from "nav-frontend-skjema";
// import { Hovedknapp } from "nav-frontend-knapper";
// import { useHistory } from "react-router-dom";
// import getTexts from '../../utils/getTexts.js';
import axios from "axios";
interface ISimpleForm {
  fornavn: string | undefined;
  etternavn: string | undefined;
  fødselsnummer: number | undefined;
}
interface IProps {
  data?: ISimpleForm | undefined;
}
const Summary = (props: IProps) => {
  const handleSending = () => {
    axios.post('/api/skademelding', {...props.data});
  }
  return (
    <>
      <Heading size="large">Oppsumering</Heading>
      <span>Fornavn: </span>{props?.data?.fornavn ? props.data.fornavn : ''} <br/>
      <span>Etternavn: </span> {props?.data?.etternavn ? props.data.etternavn : ''}<br/>
      <span>Fødselsdato: </span> {props?.data?.fødselsnummer ? props.data.fødselsnummer : ''}
      <Button onClick={handleSending}>Send inn</Button>
      {/* {Object.keys(props.data).map((prop: any) => (
        <table>
          <tbody>
          <tr>
            <td key={`${prop}-label`}>{prop}:</td>
            <td key={`${prop}-value`}>{props.data[prop]}</td>
          </tr>
          </tbody>
        </table>
      ))} */}
    </>
  );
};
export default Summary;
