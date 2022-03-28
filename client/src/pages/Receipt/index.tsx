import {
  Heading,
  ContentContainer,
  Grid,
  Cell,
  Label,
  BodyShort,
  Button,
  Alert,
} from '@navikt/ds-react';
import SystemHeader from '../../components/SystemHeader';
import StepIndicator from '../../components/StepIndicator';
import { Print } from '@navikt/ds-icons';
import { PrintService } from '../../services/PrintService';
import { logErrorMessage } from '../../utils/logging';
import { useLocation } from 'react-router';
import { Skademelding } from '../../api/yrkesskade';
import { format } from 'date-fns';

const Receipt = () => {
  const { state } = useLocation();

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
      logErrorMessage('Skademelding er null og kan ikke skrives ut');
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
              <Heading size="large" className="spacer">
                Takk for innmeldingen!
              </Heading>
              <Alert variant="success" className="spacer">Innmeldingen din om yrkesskade er mottatt { format(new Date(), 'dd.MM.yyyy')}</Alert>
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
