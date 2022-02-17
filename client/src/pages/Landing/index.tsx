import { Cell, ContentContainer, Grid, Heading } from '@navikt/ds-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import SystemHeader from '../../components/SystemHeader';
import { useFeatureToggles } from '../../context/FeatureTogglesContext';
import { useInnloggetContext } from '../../context/InnloggetContext';
import { Brukerinfo } from '../../types/brukerinfo';
import { EAllFeatureToggles } from '../../types/feature-toggles';

const Landing = () => {
  const navigate = useNavigate();
  const { innloggetBruker } = useInnloggetContext();
  const { toggles } = useFeatureToggles();

  const digitalFormAvailable = (
    innloggetBruker: Brukerinfo,
    toggles: EAllFeatureToggles
  ): boolean => {
    // check if user is part of MVP naeringskoder
    if (!toggles.DIGITAL_SKJEMA_INNSENDING) {
      console.error('Feature toggle disabled form');
      return false;
    }

    // check if user meets the number of organisations requirement
    if (innloggetBruker.organisasjoner.length !== 1) {
      console.error('User need to have access to only one organisation');
      // MVP only supports 1 organisation
      return false;
    }

    return true;
  };

  useEffect(() => {
    console.log('toggles: ', toggles);
    if (innloggetBruker && digitalFormAvailable(innloggetBruker, toggles)) {
      navigate('/yrkesskade/skjema');
    }
  }, [innloggetBruker, toggles, navigate]);

  return (
    <ContentContainer>
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>
        <Heading spacing level="3" size="medium">
          Laster
        </Heading>
        </Cell>
      </Grid>
    </ContentContainer>
  );
};

export default Landing;
