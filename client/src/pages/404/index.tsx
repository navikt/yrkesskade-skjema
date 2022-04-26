import {
  Heading,
  ContentContainer,
  Grid,
  Cell,
  Link,
  BodyShort,
  LinkPanel,
} from '@navikt/ds-react';

// import Description from '../Form/Description';

const NotFound = () => {
  return (
    <ContentContainer>
      <Grid>
        <Cell xs={12} lg={2}></Cell>
        <Cell xs={12} lg={5}>

          <Heading size="xlarge" level="1" className="spacer">Fant ikke siden</Heading>

          <BodyShort>Beklager, vi finner ikke siden du ba om.</BodyShort>

          <BodyShort>Siden kan være flyttet eller slettet.</BodyShort>

          <BodyShort>
            Bruk gjerne søket, menyen eller{' '}
            <Link href="https://nav.no">gå til forsiden</Link>
          </BodyShort>

          <Heading size="small" level="2" className="spacer">Sider du kanskje er interessert i: </Heading>

          <LinkPanel href="https://www.nav.no/no/person/arbeid/yrkesskade-og-yrkessykdom">
            <LinkPanel.Title>
            Yrkesskade og yrkessykdom
            </LinkPanel.Title>
          </LinkPanel>

          <LinkPanel href="https://www.nav.no/menerstatning" className="spacer">
            <LinkPanel.Title>
            Menerstatning
            </LinkPanel.Title>
          </LinkPanel>

          <LinkPanel href="https://www.nav.no/soknader/nb/person/helse/yrkesskade">
            <LinkPanel.Title>
            Skjema for skademelding eller skadeforklaring
            </LinkPanel.Title>
          </LinkPanel>

          <LinkPanel href="https://www.nav.no/soknader/nb/person/helse/yrkessykdom-tilleggsopplysninger" className="spacer">
            <LinkPanel.Title>
            Skjema for tilleggsopplysninger for yrkessykdom
            </LinkPanel.Title>
          </LinkPanel>

          <LinkPanel href="https://klage.nav.no/nb/helse/yrkesskade">
            <LinkPanel.Title>
            Klage på vedtak
            </LinkPanel.Title>
          </LinkPanel>

        </Cell>
        <Cell xs={12} lg={4}></Cell>
      </Grid>
    </ContentContainer>
  );
};
export default NotFound;
