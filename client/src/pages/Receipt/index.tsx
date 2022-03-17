import {
  Heading,
  ContentContainer,
  Grid,
  Cell,
  BodyLong,
  Label,
  BodyShort,
  Button,
} from '@navikt/ds-react';
import SystemHeader from '../../components/SystemHeader';
import StepIndicator from '../../components/StepIndicator';
import { Print } from '@navikt/ds-icons';
import { PrintService } from '../../services/PrintService';
import { logErrorMessage } from '../../utils/logging';
import { useLocation } from 'react-router';
import { Skademelding } from '../../api/yrkesskade';
import { useFeatureToggles } from '../../context/FeatureTogglesContext';

const Receipt = () => {
  const { state } = useLocation();
  const { toggles } = useFeatureToggles();

  const handlePrintClicked = async () => {
    if (state) {
      try {
        const response = await new PrintService().print(state as Skademelding);

        const file = new Blob([response.data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);

        const pdfWindow = window.open();

        if (pdfWindow) {
          pdfWindow.location.href = fileURL;
        } else {
          console.error('Kunne ikke åpne pdf vindu/tab');
        }

      } catch (error: any) {
        logErrorMessage(`Nedlasting av kopi feilet: ${error.message}`);
      }
    } else {
      console.error('Skademelding er null og kan ikke skrives ut');
    }
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
                data-number="7"
              >
                Kvittering
              </Heading>
              <Heading size="large" className="spacer">
                Takk for innmeldingen!
              </Heading>
              <BodyLong className="spacer">Info info info</BodyLong>
              { toggles.ER_IKKE_PROD && (
                <>
                  <Label>Skriv ut</Label>
                  <BodyShort spacing>
                    Ønsker du kopi av skademeldingen, kan du skrive den ut her
                  </BodyShort>
                  <Button
                    className="no-print"
                    onClick={handlePrintClicked}
                    variant="tertiary"
                    data-testid="kvittering-print-kopi"
                  >
                    <Print />
                    Skriv ut en kopi av skademeldingen
                  </Button>
                </>
              )}
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
export default Receipt;
