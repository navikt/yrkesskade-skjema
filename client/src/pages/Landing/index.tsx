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
import { useFeatureToggles } from '../../context/FeatureTogglesContext';
import { useInnloggetContext } from '../../context/InnloggetContext';
import { Brukerinfo } from '../../types/brukerinfo';
import { EAllFeatureToggles } from '../../types/feature-toggles';
import { logMessage } from '../../utils/logging';
import './Landing.less';

const Landing = () => {
  const navigate = useNavigate();
  const { innloggetBruker } = useInnloggetContext();
  const { toggles } = useFeatureToggles();
  const [content, setContent] = useState<ReactElement>(<LoadingContent />);

  const digitalFormAvailable = (
    innloggetBruker: Brukerinfo,
    toggles: EAllFeatureToggles
  ): boolean => {
    if (toggles.ER_IKKE_PROD) {
      logMessage('Digitalt skjema tilgjengelig: er ikke i produksjons miljø');
      return true;
    }
    // check if user is part of MVP naeringskoder
    if (!toggles.DIGITAL_SKJEMA_INNSENDING) {
      logMessage('Feature toggle disabled form')
      return false;
    }

    const organisationsLength = innloggetBruker.organisasjoner.length;

    // check if user meets the number of organisations requirement
    if (organisationsLength !== 1) {

      if (organisationsLength > 1) {
        // MVP only supports 1 organisation
        logMessage(`User has access to ${organisationsLength} organisations.`);
      }

      if (innloggetBruker.organisasjoner.length === 0) {
        logMessage('User must have access to at least 1 organisation')
      }

      return false;
    }

    return true;
  };

  useEffect(() => {
    if (innloggetBruker) {
      const tilgangTilDigitaltskjema = digitalFormAvailable(
        innloggetBruker,
        toggles
      );
      if (tilgangTilDigitaltskjema) {
        navigate('/yrkesskade/skjema');
      } else {
        setContent(<NoAccessContent />);
      }
    }
  }, [innloggetBruker, toggles, navigate]);

  return (
    <ContentContainer>
      {content}
    </ContentContainer>
  );
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
    window.location.href = 'https://www.nav.no/no/person/arbeid/yrkesskade-og-yrkessykdom';
  }

  return (
    <Grid>
      <Cell xs={12} lg={6}>
        <Heading spacing level="3" size="medium">
          Innmelding av yrkesskade
        </Heading>
        <BodyLong className="spacer">
          Det ser ut som du fortsatt må ta i bruk dagens løsning, men vi setter
          stor pris på at du er intressert i den digitale løsningen. Velkommen
          tilbake igjen ved neste anledning for å sjekke om din bruker er
          inkludert. Takk for tålmodigheten.
        </BodyLong>
        <BodyShort>
          <Button onClick={handleClick}>Tilbake til dagens løsning</Button>
        </BodyShort>
      </Cell>
    </Grid>
  );
};

export default Landing;
