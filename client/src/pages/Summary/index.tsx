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
const Summary = (props: IProps) => {
  console.log(props.data);
  const testData: IGeneralForm = {
    hendelsesfakta: {
      tid: {
        dato: "20071993",
        tidspunkt: "12:32",
        ukjent: undefined,
        tidstype: "Under permisjon",
      },
      hvorSkjeddeUlykken: "0",
      typeUlykkeTabellA: "Velt",
      bakgrunnsaarsakTabellB: "Verneutstyr fjernet",
      utfyllendeBeskrivelse:
        "Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende beskrivelse over veldig mange tegn. Utfyllende.",
    },
    skadelidt: {
      arbeidsforhold: { rolletype: "Rolle", stillingstittel: "Stilling" },
      foedselsnummer: "12345678910",
    },
    skade: {
      alvorlighetsgrad: "Veldig",
      kroppsdelTabellD: "Øye, høyre",
      skadeartTabellC: "Varmeskade",
      legeKontaktet: "Ja"
    },
  };
  console.log('test', testData);
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
      <SystemHeader />
      <Grid>
        <Cell xs={12}>
          <Heading size="2xlarge" className="pageTitle">
            Oppsumering
          </Heading>
        </Cell>
        <Cell xs={12} lg={6} className="grid-centered--lg">
        <InnmelderSummary innmelder={testData?.innmelder}/>
        <SkadelidtSummary skadelidt={testData.skadelidt}/>
        <SkadeSummary skade={testData.skade}/>
        <HendelsesfaktaSummary hendelsesfakta={testData.hendelsesfakta}/>
        </Cell>
        <Cell xs={12} lg={12} className="grid-centered--lg">
          <Button onClick={handleSending}>Send inn</Button>
        </Cell>
      </Grid>
    </ContentContainer>
  );
};
export default Summary;
