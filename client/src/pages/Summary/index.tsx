import './summary.less';
import {
  Heading,
  Button,
  ContentContainer,
  Grid,
  Cell,
  Accordion,
  BodyLong,
} from '@navikt/ds-react';
import SystemHeader from '../../components/SystemHeader';
import BackButton from '../../components/BackButton';
import InnmelderSummary from '../../components/Summary/Innmelder';
import TidsromSummary from '../../components/Summary/Tidsrom';
import SkadelidtSummary from '../../components/Summary/Skadelidt';
import UlykkeSummary from '../../components/Summary/Ulykke';
import SkadeSummary from '../../components/Summary/Skade';
import BeskrivelseSummary from '../../components/Summary/Beskrivelse';
import { useNavigate } from 'react-router-dom';
// import getTexts from '../../utils/getTexts.js';
import axios from 'axios';
// import { IGeneralForm } from '../../Interfaces/generalForm';
import StepIndicator from '../../components/StepIndicator';
// import formUpdateAction from '../../State/formUpdateAction';

// import { ISteps } from '../../Interfaces/steps';

import { useStateMachine } from 'little-state-machine';

const Summary = () => {
  const { state } = useStateMachine();
  const data = state;
  // const data = {
  //   innmelder: {
  //     norskIdentitetsnummer: 20089408750,
  //     paaVegneAv: 'paaVegneAv',
  //     innmelderrolle: 'innmelderrolle',
  //     altinnrolleIDer: ['altinnrolleIDer', 'altinnrolleIDer'],
  //   },
  //   skadelidt: {
  //     norskIdentitetsnummer: 'norskIdentitetsnummer',
  //     dekningsforhold: {
  //       organisasjonsnummer: 'organisasjonsnummer',
  //       navnPaaVirksomheten: 'navnPaaVirksomheten',
  //       stillingstittelTilDenSkadelidte: 'stillingstittelTilDenSkadelidte',
  //       rolletype: 'rolletype',
  //     },
  //   },
  //   skade: {
  //     alvorlighetsgrad: 'alvorlighetsgrad',
  //     skadedeDeler: [
  //       {
  //         kroppsdelTabellD: 'kroppsdelTabellD',
  //         skadeartTabellC: 'skadeartTabellC',
  //       },
  //       {
  //         kroppsdelTabellD: 'kroppsdelTabellD',
  //         skadeartTabellC: 'skadeartTabellC',
  //       },
  //       {
  //         kroppsdelTabellD: 'kroppsdelTabellD',
  //         skadeartTabellC: 'skadeartTabellC',
  //       },
  //     ],
  //     antattSykefravaerTabellH: 'antattSykefravaerTabellH',
  //   },
  //   hendelsesfakta: {
  //     tid: {
  //       tidspunkt: new Date(),
  //       periode: {
  //         fra: new Date(),
  //         til: new Date(),
  //       },
  //       ukjent: false,
  //       tidstype: 'periode',
  //     },
  //     naarSkjeddeUlykken: 'naarSkjeddeUlykken',
  //     hvorSkjeddeUlykken: 'hvorSkjeddeUlykken',
  //     ulykkessted: {
  //       sammeSomVirksomhetensAdresse: false,
  //       adresse: {
  //         adresselinje1: 'adresselinje1',
  //         adresselinje2: 'adresselinje2',
  //         adresselinje3: 'adresselinje3',
  //         land: 'land',
  //       },
  //     },
  //     aarsakUlykkeTabellAogE: ['årsak1', 'årsak2', 'årsak3'],
  //     bakgrunnsaarsakTabellBogG: ['bakgrunn1', 'bakgrunn2', 'bakgrunn3'],
  //     utfyllendeBeskrivelse: 'utfyllende bla bla bla',
  //     stedsbeskrivelseTabellF: 'Stedsgreie streng lalala',
  //   },
  // };
  const navigate = useNavigate();
  const handleSending = async () => {
    try {
      await axios.post('/api/midlertidig/skademeldinger', { data });
      navigate('/yrkesskade/skjema/kvittering');
    } catch {
      navigate('/yrkesskade/skjema/feilmelding');
    }
  };
  const handleAbort = () => {
    window.location.href = 'https://nav.no';
  };
  return (
    <ContentContainer>
      <SystemHeader/>
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
          <BackButton url="/yrkesskade/skjema/beskrivelse"/>
          <Heading
            size="2xlarge"
            className="pageNumberTitle spacer"
            data-number="6"
          >
            Oppsumering
          </Heading>
          <BodyLong className="spacer">
            Les gjennom oppsummeringen før du sender inn innmeldingen. Hvis du
            trenger å gjøre endringer kan du gjøre det helt frem til du har
            bekreftet innsendingen. Her kan du også skrive ut egen kopi av
            skademeldingen.
          </BodyLong>
          <Accordion className="spacer">
            <Accordion.Item>
              <Accordion.Header>Om deg</Accordion.Header>
              <Accordion.Content>
                <InnmelderSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>Tid og sted</Accordion.Header>
              <Accordion.Content>
                <TidsromSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>Om den skadelidte</Accordion.Header>
              <Accordion.Content>
                <SkadelidtSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>Om ulykken</Accordion.Header>
              <Accordion.Content>
                <UlykkeSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>Om skaden</Accordion.Header>
              <Accordion.Content>
                <SkadeSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>Utfyllende beskrivelse</Accordion.Header>
              <Accordion.Content>
                <BeskrivelseSummary data={data} />
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
          <div className="buttonGroup no-print">
            <Button variant="secondary" onClick={handleAbort}>
              Avbryt
            </Button>
            <Button onClick={handleSending}>Send inn</Button>
          </div>
        </Cell>
        <Cell xs={12} sm={12} lg={2}>
          <StepIndicator />
        </Cell>
        <Cell xs={12} lg={2}></Cell>
      </Grid>
    </ContentContainer>
  );
};
export default Summary;
