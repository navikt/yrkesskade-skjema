import './summary.less';
import {
  Heading,
  Button,
  ContentContainer,
  Grid,
  Cell,
} from "@navikt/ds-react";
import SystemHeader from "../../components/SystemHeader"
import HendelsesfaktaSummary from "../../components/Summary/Hendelsesfakta"
import InnmelderSummary from "../../components/Summary/Innmelder"
import SkadelidtSummary from "../../components/Summary/Skadelidt"
import SkadeSummary from "../../components/Summary/Skade"
import { useNavigate } from "react-router-dom";
// import getTexts from '../../utils/getTexts.js';
import axios from "axios";
import { IGeneralForm } from "../../Interfaces/generalForm";
interface IProps {
  data?: IGeneralForm | undefined;
}
const Summary = ({ data }: IProps) => {
  const navigate = useNavigate();
  const handleSending = async () => {
    try {
      await axios.post("/api/skademelding", { ...data });
      navigate("/yrkesskade/skjema/kvittering");
    } catch {
      navigate("/yrkesskade/skjema/feilmelding");
    }
  };
  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12}>
          <Heading size="2xlarge" className="pageTitle">
            Oppsumering
          </Heading>
        </Cell>
        <Cell xs={12} lg={12} className="grid-centered--lg">
        <InnmelderSummary innmelder={data?.innmelder}/>
        <SkadelidtSummary skadelidt={data?.skadelidt}/>
        <SkadeSummary skade={data?.skade}/>
        <HendelsesfaktaSummary hendelsesfakta={data?.hendelsesfakta}/>
        </Cell>
        <Cell xs={12} lg={12} className="grid-centered--lg">
          <Button onClick={handleSending}>Send inn</Button>
        </Cell>
      </Grid>
    </ContentContainer>
  );
};
export default Summary;
