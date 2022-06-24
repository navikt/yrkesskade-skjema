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
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../../components/StepIndicator';
import ExitButton from '../../components/ExitButton';

import { useInnloggetContext } from '../../context/InnloggetContext';
import { Adresse, Organisasjon } from '../../types/brukerinfo';
import { useEffect } from 'react';

import {
  BrukerinfoControllerService,
  Dekningsforhold,
  Innmelder,
  OrganisasjonDto,
  Skadelidt,
  Skademelding,
} from '../../api/yrkesskade';
import { logMessage } from '../../utils/logging';
import { logAmplitudeEvent } from '../../utils/analytics/amplitude';
import { addOrganisasjon, selectOrganisasjon } from '../../core/reducers/app.reducer';
// import Description from '../Form/Description';
import { useAppDispatch, useAppSelector } from '../../core/hooks/state.hooks';
import {
  oppdaterSkademelding,
} from '../../core/reducers/skademelding.reducer';
import { useFormContext } from 'react-hook-form';

const Info = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue
  } = useFormContext<Skademelding>();

  const handleForward = (data: Skademelding) => {
      dispatch(oppdaterSkademelding(data));
      logMessage('Bruker har startet innmelding');
      logAmplitudeEvent('skademelding.innmelding', { status: 'startet' });
      navigate('/yrkesskade/skjema/skadelidt');
  };

  const { innloggetBruker } = useInnloggetContext();

  const organisasjon = useAppSelector((state) => selectOrganisasjon(state));

  useEffect(() => {
    if (innloggetBruker?.fnr) {
      settValgtVirksomhet(innloggetBruker.organisasjoner[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    innloggetBruker?.fnr,
    innloggetBruker?.organisasjoner
  ]);

  const settValgtVirksomhet = (virksomhet: Organisasjon) => {
    BrukerinfoControllerService.hentOrganisasjon(
      virksomhet.organisasjonsnummer
    ).then(async (organisasjon: OrganisasjonDto) => {
      if (!organisasjon.organisasjonsnummer) {
        return;
      }

      console.log('virksomhet: ', virksomhet);
      console.log('organisasjon', organisasjon);



      const roller = await BrukerinfoControllerService.hentRoller(
        organisasjon.organisasjonsnummer
      );

      const adresse =
        organisasjon.beliggenhetsadresse || organisasjon.forretningsadresse;

      const oppdatertVirksomhet = {...virksomhet};
      oppdatertVirksomhet.beliggenhetsadresse = organisasjon.beliggenhetsadresse as Adresse;
      oppdatertVirksomhet.forretningsadresse = organisasjon.forretningsadresse as Adresse;
      dispatch(addOrganisasjon(oppdatertVirksomhet));

      const altinnRollerIder = roller
        .filter((altinnRolle) => altinnRolle.RoleDefinitionId)
        .map((altinnRolle) =>
          altinnRolle.RoleDefinitionId
            ? altinnRolle.RoleDefinitionId.toString()
            : ''
        );
      //dispatch(oppdaterAltinnRoller(altinnRollerIder));
      //   dispatch(oppdaterPaaVegneAv(organisasjon.organisasjonsnummer));
      setValue('skadelidt.dekningsforhold.organisasjonsnummer', oppdatertVirksomhet.organisasjonsnummer);
      setValue('skadelidt.dekningsforhold.navnPaaVirksomheten', oppdatertVirksomhet.navn);
      if (adresse) {
        setValue('skadelidt.dekningsforhold.virksomhetensAdresse', { adresselinje1: adresse?.adresser[0], adresselinje2: adresse?.postnummer, adresselinje3: adresse?.poststed, land: adresse?.landkode});
      }
      setValue('innmelder.norskIdentitetsnummer', innloggetBruker?.fnr.toString() || '');
      setValue('innmelder.innmelderrolle', 'virksomhetsrepresentant');
      setValue('innmelder.paaVegneAv', oppdatertVirksomhet.organisasjonsnummer);
      setValue('innmelder.altinnrolleIDer', altinnRollerIder);
    });
  };

  useEffect(() => {}, [])

  const tilbakeTilPapirskjema = () => {
    logAmplitudeEvent('skademelding.innmelding', { status: 'papir', kilde: 'infoside' });
    window.location.href=document.referrer
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
              {innloggetBruker && innloggetBruker.organisasjoner.length && organisasjon && (
                <>
                  <Label>Navn</Label>
                  <BodyShort spacing>{innloggetBruker.navn}</BodyShort>
                  <Label>Virksomhet</Label>
                  <BodyShort>{organisasjon.navn}</BodyShort>
                  <Detail spacing>
                    virksomhetsnummer: {organisasjon.organisasjonsnummer}
                  </Detail>
                </>
              )}
            </div>
            <div>
              <Heading size="large" className="spacer">
                Virksomhetens meldeplikt
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
                NAV effektivt kan behandle saken. Statistisk sentralbyrå og
                tilsynsmyndigheter bruker data om arbeidstakeres yrkesskader til
                analyse og statistikkformål. Personopplysninger om andre
                personer enn den skadelidte selv ansees ikke å være relevante
                for saken. Personopplysninger om den skadelidte skal avgrenses
                til behandlingens formål for å beskrive fakta om hendelsen og
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
              <Link className="spacer" onClick={tilbakeTilPapirskjema}>
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
              <BodyShort className="">+47 55 55 33 36</BodyShort>
            </div>
            <div className="buttonSection spacer buttonGroup">
              <ExitButton />
              <Button
                variant="primary"
                onClick={handleSubmit(handleForward)}
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
