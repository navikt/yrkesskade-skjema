import {
  Heading,
  ContentContainer,
  Grid,
  Cell,
  Button,
  BodyLong,
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
import {
  oppdaterInnmelder,
  oppdaterPaaVegneAv,
  oppdaterDekningsforholdOrganisasjon,
} from '../../State/actions/skademeldingStateAction';
import {
  BrukerinfoControllerService,
  OrganisasjonDto,
} from '../../api/yrkesskade';
import clearFormAction from '../../State/actions/clearAction';
// import Description from '../Form/Description';

const Info = () => {
  const navigate = useNavigate();
  const { actions } = useStateMachine({
    oppdaterPaaVegneAv,
    oppdaterInnmelder,
    oppdaterDekningsforholdOrganisasjon,
    clearFormAction
  });

  const handleForward = () => {
    navigate('/yrkesskade/skjema/tidsrom');
  };

  const handleCancel = () => {
    actions.clearFormAction({});
    navigate('https://nav.no');
  };

  const { innloggetBruker } = useInnloggetContext();
  const { selectedCompany, setSelectedCompany, setSelectedAddress } =
    useSelectedCompany();

  useEffect(() => {
    if (innloggetBruker?.fnr) {
      settValgtVirksomhet(innloggetBruker.organisasjoner[0]);
      actions.oppdaterInnmelder({
        norskIdentitetsnummer: innloggetBruker.fnr,
        innmelderrolle: 'Virksomhetsrepresentant',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    innloggetBruker?.fnr,
    innloggetBruker?.organisasjoner,
    setSelectedCompany,
  ]);

  const settValgtVirksomhet = (virksomhet: Organisasjon) => {
    setSelectedCompany(virksomhet);

    BrukerinfoControllerService.hentOrganisasjon(
      virksomhet.organisasjonsnummer
    ).then(async (organisasjon: OrganisasjonDto) => {
      if (!organisasjon.organisasjonsnummer) {
        return;
      }

      const adresse =
        organisasjon.beliggenhetsadresse || organisasjon.forretningsadresse;
      setSelectedAddress(adresse);

      actions.oppdaterPaaVegneAv(organisasjon.organisasjonsnummer);
      actions.oppdaterDekningsforholdOrganisasjon({
        organisasjonsnummer: organisasjon.organisasjonsnummer as string,
        navn: organisasjon.navn || '',
      });
    });
  };

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
                Veiledning
              </Heading>
              <Heading size="large" className="">
                Velkommen til innmelding av yrkesskade!
              </Heading>
              <BodyLong className="spacer">
                Du har mulighet til å sende digital skademelding. Under ser du
                hvilken bedrift du er i ferd med å sende inn på vegne av. Din
                digitale signatur erstatter virksomhetens signatur og stempel.
              </BodyLong>
              {innloggetBruker && innloggetBruker.organisasjoner.length && (
                <>
                  <Label>Navn</Label>
                  <BodyShort spacing>{innloggetBruker.navn}</BodyShort>
                  <Label>Virksomhet</Label>
                  <BodyShort>{selectedCompany.navn}</BodyShort>
                  <Detail spacing>
                    virksomhetsnummer: {selectedCompany.organisasjonsnummer}
                  </Detail>
                </>
              )}
            </div>
            <div>
              <Heading size="large" className="spacer">
                Arbeidsgivers meldeplikt
              </Heading>
              <BodyLong className="spacer">
                Arbeidsgiver og andre i tilsvarende stilling er pålagt
                meldeplikt til NAV etter folketrygdloven § 13-14.
              </BodyLong>
              <Link
                href="https://lovdata.no/nav/folketrygdloven/kap13"
                target="_BLANK"
                className=""
              >
                Les om arbeidsgivers meldeplikt her (åpnes i nytt vindu)
              </Link>
            </div>
            <div>
              <Heading size="large" className="spacer">
                Om innmeldingen
              </Heading>
              <BodyLong className="spacer">
                Opplysningene som oppgis skal være riktige og relevante, slik at
                NAV effektivt kan behandle saken. Anonymiserte data vil også bli
                brukt av Statistisk sentralbyrå og tilsynsmyndighet for analyse
                og statistikkformål. Personopplysninger om andre personer enn
                den skadelidte selv ansees ikke å være relevante for saken.
                Personopplysninger om den skadelidte skal avgrenses til
                behandlingens formål for å beskrive fakta om hendelsen og
                hvilken skade arbeidsulykken påførte den skadelidte.
              </BodyLong>
              <BodyShort>
                Husk å logge av på nav.no etter at du er ferdig med
                registreringen.
              </BodyShort>
            </div>
            <div>
              <Heading size="large" className="spacer">
                For deg som ønsker å sende opplysninger til NAV i posten
              </Heading>
              <BodyLong className="">
                Hvis du ønsker å sende inn skademeldingen eller andre
                opplysninger til NAV per post kan du fortsatt benytte deg av
                dagens løsning på papir. Da må du laste ned og skrive ut en
                førsteside til saken. Dette førstesidearket inneholder viktig
                informasjon om hvilken enhet i NAV som skal motta
                dokumentasjonen. Adressen du skal sende dokumentene til finner
                du også på denne førstesiden. På sikt ønsker vi at den digitale
                innsendingen erstatter denne løsningen fullstendig.
              </BodyLong>
              <Link href={document.referrer} className="spacer">
                Gå tilbake til papirskjema hvor du også finner førstesiden
              </Link>
            </div>
            <div>
              <Heading size="medium" className="spacer">
                Kontakt
              </Heading>
              <BodyShort>
                Oppdager du problemer eller har spørsmål kan du ta kontakt på:
              </BodyShort>
              <BodyShort className="">+47 920 36 454</BodyShort>
            </div>
            <div className="buttonSection spacer buttonGroup">
              <Button
                variant="secondary"
                onClick={handleCancel}
                data-testid="avbryt-innmelding"
                className=""
              >
                Avbryt
              </Button>
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
          <StepIndicator />
        </Cell>
        <Cell xs={12} lg={2}></Cell>
      </Grid>
    </ContentContainer>
  );
};
export default Info;
