import { Express} from 'express';
import { logInfo, logWarn, logError} from '@navikt/yrkesskade-logging';
import axios from 'axios';
import config from '../config';
import { pdfSkademeldingMapper } from '../dokgen/pdfSkademeldingMapper';
import { Skademelding } from '../../client/src/api/yrkesskade';

export const configurePrintEndpoint = (app: Express): Express => {
  app.post(`/print`, handlePrint);
  return app;
};

const handlePrint = async (req, res) => {
  if (!req || !req.body) {
    logError('Ugyldig print request. Mangler skademelding');
    res.sendStatus(400);
  }

  const pdfSkademelding = pdfSkademeldingMapper(req.body as Skademelding);

  const response = await axios.post(`${config.DOKGEN_URL}/template/skademelding-tro-kopi/download-pdf`, pdfSkademelding, {
    responseType: 'stream'
  });

  if (response.status !== 200) {
    logError(`Feilet i å generere PDF. Status: ${response.status} ${response.data}`);
    res.sendStatus(400);
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=kopi_skademelding.pdf')
  response.data.pipe(res);
}
