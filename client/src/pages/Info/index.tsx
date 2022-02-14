import {
  Heading,
  ContentContainer,
  Grid,
  Cell,
  Button,
  BodyLong,
  Alert,
  Link,
} from '@navikt/ds-react';
import SystemHeader from '../../components/SystemHeader';
// import getTexts from '../../utils/getTexts';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../../components/StepIndicator';

import { ISteps } from '../../Interfaces/steps';
import OrganisationSelect from '../../components/OrganisationSelect';
import { useInnloggetContext } from '../../context/InnloggetContext';
import { Organisasjon } from '../../types/brukerinfo';
import axios from 'axios';
import { useForm } from 'react-hook-form';
interface IProps {
  steps: ISteps;
  // updateStep: (data: { step: number; higher: Boolean }) => void;
  increaseStep: () => void;
}

const Info = ({ steps, increaseStep }: IProps) => {
  const navigate = useNavigate();
  const { setValue } = useForm();
  const handleForward = () => {
    increaseStep();
    navigate('/yrkesskade/skjema/tidsrom');
  };

  const { innloggetBruker } = useInnloggetContext();

  const onOrganisasjonChange = (organisasjon: Organisasjon) => {

    axios.get<Organisasjon>(`/api/v1/brukerinfo/${organisasjon.organisasjonsnummer}`).then((response) => {
      console.log('set adresse felter');
      const organisasjon = response.data;
      console.log(' organisasjon: ', organisasjon);

    })
  }

  return (
    <ContentContainer>
      <SystemHeader />
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
          <div className="cellContentContainer">
            <div>
              <Heading
                size="2xlarge"
                className="pageNumberTitle spacer"
                data-number="1"
              >
                Innledning
              </Heading>
              <BodyLong className="spacer">
                Kort intro om hva du er i gang med å søke om nå. Kort intro om
                hva du er i gang med å søke om nå. Kort intro om hva du er i
                gang med å søke om nå.{' '}
              </BodyLong>
              {
                innloggetBruker && (
                  <OrganisationSelect organisasjoner={innloggetBruker.organisasjoner.filter((organisasjon) => organisasjon.status === 'Active')} onOrganisasjonChange={onOrganisasjonChange} data-testid="virksomhetsvelger" />
                )
              }
              <Link
                className="spacer"
                href="https://google.com"
                target="_BLANK"
              >
                Les om plikter du har som arbeidsgiver (åpnes i nytt vindu)
              </Link>
            </div>
            <div>
              <Heading size="large">
                Jeg skal laste ned “Første side til saken din
              </Heading>
              <BodyLong className="spacer">
                Hvis du ikke skal sende inn søknad, men...
              </BodyLong>
              <Link href="https://google.com" className="spacer">
                Gå tilbake til papirskjema
              </Link>
            </div>
            <div>
              <Heading size="large">Slik sender du digital innmelding</Heading>
              <BodyLong className="spacer">
                Det tar ca x minutter å gjennomføre innmeldingen. Det kan hende
                at vi trenger mer dokumentasjon når vi skal behandle
                innmeldingen. Da gir vi beskjed til den skadelidte/spesialist.
              </BodyLong>
              <Alert variant="info" className="spacer">
                <Heading size="small">Vi henter:</Heading>
                <ul>
                  <li>Personinformasjon om deg og dine ansatte.</li>
                  <li>Inntektsinformasjon fra Skatteetaten.</li>
                </ul>
                <Link href="https://google.com">
                  Slik behandler vi personopplysningene dine
                </Link>
              </Alert>
            </div>
            <div className="buttonSection">
              <Button
                variant="primary"
                onClick={handleForward}
                data-testid="start-innmelding"
              >
                Start innmelding
              </Button>
            </div>
          </div>
        </Cell>
        <Cell xs={12} sm={12} lg={2}>
          <StepIndicator steps={steps} />
        </Cell>
        <Cell xs={12} lg={2}></Cell>
      </Grid>
    </ContentContainer>
  );
};
export default Info;
