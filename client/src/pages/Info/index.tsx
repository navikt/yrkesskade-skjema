import {
  Heading,
  ContentContainer,
  Grid,
  Cell,
  Button,
} from "@navikt/ds-react";
import SystemHeader from "../../components/SystemHeader";
import getTexts from "../../utils/getTexts";
import { useNavigate } from "react-router-dom";

export default function Info() {
  const navigate = useNavigate();
  const handleForward = () => {
    navigate("/yrkesskade/skjema");
  };
  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12}>
          <Heading size="2xlarge" className="pageTitle">
            {getTexts("indexTitle")}
          </Heading>
        </Cell>
        <Cell xs={12} sm={12} lg={12}>
          <div className="buttonSection">
            <Button variant="primary" onClick={handleForward} data-testid="start-innmelding">
              Start innmelding
            </Button>
          </div>
        </Cell>
      </Grid>
    </ContentContainer>
  );
}
