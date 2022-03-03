import {
  Heading,
  ContentContainer,
  Grid,
  Cell,
  Button,
  BodyLong,
  Alert,
  Link,
  BodyShort,
  Label,
  Detail,
} from '@navikt/ds-react';
import SystemHeader from '../../components/SystemHeader';
// import getTexts from '../../utils/getTexts';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../../components/StepIndicator';

// import { ISteps } from '../../Interfaces/steps';
import { useInnloggetContext } from '../../context/InnloggetContext';
import { Organisasjon } from '../../types/brukerinfo';
import { useEffect } from 'react';
import { useSelectedCompany } from '../../context/SelectedCompanyContext';
import { useStateMachine } from 'little-state-machine';
import { oppdaterInnmelder, oppdaterPaaVegneAv, oppdaterDekningsforholdOrganisasjon } from '../../State/skademeldingStateAction';
import { BrukerinfoControllerService, OrganisasjonDto } from '../../api/yrkesskade';
// import Description from '../Form/Description';

const Info = () => {
  const navigate = useNavigate();
  const { actions } = useStateMachine({ oppdaterPaaVegneAv, oppdaterInnmelder, oppdaterDekningsforholdOrganisasjon });

  const handleForward = () => {
    navigate('/yrkesskade/skjema/tidsrom');
  };

  const { innloggetBruker } = useInnloggetContext();
  const { selectedCompany, setSelectedCompany, setSelectedAddress } = useSelectedCompany();

  useEffect(() => {
    if (innloggetBruker?.fnr) {
      settValgtVirksomhet(innloggetBruker.organisasjoner[0]);
      actions.oppdaterInnmelder({ norskIdentitetsnummer: innloggetBruker.fnr, innmelderrolle: 'Virksomhetsrepresentant'});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innloggetBruker?.fnr, innloggetBruker?.organisasjoner, setSelectedCompany])

  const settValgtVirksomhet = (virksomhet: Organisasjon) => {
    setSelectedCompany(virksomhet);

    BrukerinfoControllerService.hentOrganisasjon(virksomhet.organisasjonsnummer).then(async (organisasjon: OrganisasjonDto) => {
      if (!organisasjon.organisasjonsnummer) {
        return;
      }

      const adresse = organisasjon.beliggenhetsadresse || organisasjon.forretningsadresse;
      setSelectedAddress(adresse);

      actions.oppdaterPaaVegneAv(organisasjon.organisasjonsnummer)
      actions.oppdaterDekningsforholdOrganisasjon({ organisasjonsnummer: organisasjon.organisasjonsnummer as string, navn: organisasjon.navn || '' });
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
                innloggetBruker && innloggetBruker.organisasjoner.length && (
                  <>
                  <Label>Navn</Label>
                  <BodyShort spacing>{innloggetBruker.navn}</BodyShort>
                  <Label>Virksomhet</Label>
                  <BodyShort >{selectedCompany.navn}</BodyShort>
                  <Detail spacing>virksomhetsnummer: {selectedCompany.organisasjonsnummer}</Detail>
                  </>
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
          <StepIndicator/>
        </Cell>
        <Cell xs={12} lg={2}></Cell>
      </Grid>
    </ContentContainer>
  );
};
export default Info;

