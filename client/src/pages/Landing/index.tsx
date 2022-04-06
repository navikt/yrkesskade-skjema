/* eslint-disable react-hooks/exhaustive-deps */
import {
  BodyLong,
  BodyShort,
  Button,
  Cell,
  ContentContainer,
  Grid,
  Heading,
  Ingress,
  Loader,
} from '@navikt/ds-react';
import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BrukerinfoControllerService } from '../../api/yrkesskade';
import { useFeatureToggles } from '../../context/FeatureTogglesContext';
import { useInnloggetContext } from '../../context/InnloggetContext';
import { Brukerinfo } from '../../types/brukerinfo';
import { EAllFeatureToggles } from '../../types/feature-toggles';
import { logMessage } from '../../utils/logging';
import { sjekkTilgangTilSkjema } from '../../utils/skjemaTilgangstyring';
import './Landing.less';

const Landing = () => {
  const navigate = useNavigate();
  const { innloggetBruker } = useInnloggetContext();
  const { toggles } = useFeatureToggles();
  const [content, setContent] = useState<ReactElement>(<LoadingContent />);

  const digitalFormAvailable = async (
    innloggetBruker: Brukerinfo,
    toggles: EAllFeatureToggles
  ): Promise<boolean> => {
    if (toggles.ER_IKKE_PROD) {
      logMessage('Digitalt skjema tilgjengelig: er ikke i produksjons miljø');
      return true;
    }
    // check if user is part of MVP naeringskoder
    if (!toggles.DIGITAL_SKJEMA_INNSENDING) {
      logMessage('Digitalt skjema utilgjengelig');
      return false;
    }

    logMessage('Digitalt skjema tilgjengelig: MVP kriterie er oppfylt');

    const organisationsLength = innloggetBruker.organisasjoner.length;

    // check if user meets the number of organisations requirement
    if (organisationsLength !== 1) {
      if (organisationsLength > 1) {
        // MVP only supports 1 organisation
        logMessage(
          `Innlogget bruker har tilgang til ${organisationsLength} organisasjoner.`
        );
      }

      if (innloggetBruker.organisasjoner.length === 0) {
        logMessage('Innlogget bruker har ikke tilgang til noen organisasjoner');
      }

      return false;
    }

    const organisasjon = innloggetBruker.organisasjoner[0];
    const roller = await BrukerinfoControllerService.hentRoller(
      organisasjon.organisasjonsnummer
    );

    if (!sjekkTilgangTilSkjema(roller)) {
      logMessage(
        `Innlogget bruker har ikke nødvendige roller for valgt organisasjon`
      );
      return false;
    }

    logMessage('Innlogget bruker har tilgang til skjema');
    return true;
  };

  const sjekkTilgang = async (innloggetBruker: Brukerinfo) => {
    const tilgangTilDigitaltskjema = await digitalFormAvailable(
      innloggetBruker,
      toggles
    );
    setContent(<NoAccessContent />);
    if (tilgangTilDigitaltskjema) {
      logMessage('Innlogget bruker har tilgang til skjema');
      navigate('/yrkesskade/skjema');
    } else {
      logMessage('Innlogget bruker har ikke tilgang til skjema - sendes til NoAccess siden');
      setContent(<NoAccessContent />);
    }
  };

  useEffect(() => {
    if (innloggetBruker) {
      sjekkTilgang(innloggetBruker);
    }
  }, [innloggetBruker, toggles, navigate]);

  return <ContentContainer>{content}</ContentContainer>;
};

const LoadingContent = () => {
  return (
    <Grid>
      <Cell xs={12} lg={4}></Cell>
      <Cell xs={12} lg={4} className="center">
        <Heading spacing level="3" size="medium">
          <Loader size="xlarge" />
        </Heading>
        <Heading spacing level="3" size="medium">
          Henter opplysninger
        </Heading>
        <Ingress spacing>
          Vennligst vent mens vi henter de nødvendige opplysningene
        </Ingress>
      </Cell>
    </Grid>
  );
};

const NoAccessContent = () => {
  const handleClick = () => {
    window.location.href =
      'https://www.nav.no/no/person/arbeid/yrkesskade-og-yrkessykdom';
  };

  return (
    <Grid>
      <Cell xs={12} lg={6}>
        <Heading spacing level="3" size="medium">
          Du må fortsatt sende inn skademeldingen på papir.
        </Heading>
        <BodyLong className="spacer">
          De fleste arbeidsgivere har fortsatt ikke fått tilgang til den
          digitale innsending. Vi jobber med å inkludere flere virksomheter
          ukentlig. Vi ønsker deg velkommen tilbake senere. Takk for
          tålmodigheten.
        </BodyLong>
        <BodyShort>
          <Button onClick={handleClick}>Tilbake til dagens løsning</Button>
        </BodyShort>
      </Cell>
    </Grid>
  );
};

export default Landing;
