import express from 'express';
import path from 'path';
import { getHtmlWithDecorator } from './dekorator';
import { initIdPorten } from './idporten';
import config from './config';
import cors from 'cors';
import dotenv from 'dotenv';
import cookies from 'cookie-parser';
import { initTokenX } from './tokenx';
import {
  konfigurerAllFeatureTogglesEndpoint as configureAllFeatureTogglesEndpoint,
  configureFeatureTogglesEndpoint,
} from './routes/feature-toggles';
import { configureApiEndpoint } from './routes/api';
import { configureAuthenticationAndVerification } from './routes/authenticate';
import { configureLoggingEndpoint } from './routes/logging';
import bodyParser from 'body-parser'
import { logInfo }from '@navikt/yrkesskade-logging'
import { configurePrintEndpoint } from './routes/print';

const BUILD_PATH = path.join(__dirname, '../build');
const PORT = process.env.PORT || 3000;
const app = express();

dotenv.config();

app.use(cors());
app.use(cookies());
app.use(express.json());
app.use(express.static('../build'));

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// health checks
app.get([`/internal/isAlive`, `/internal/isReady`], (req: any, res: any) =>
  res.sendStatus(200)
);

// api endepunkt med proxy til backend
configureApiEndpoint(app, '/api', config.API_URL);

// feature toggle endpoints
configureFeatureTogglesEndpoint(app);
configureAllFeatureTogglesEndpoint(app);

// enpoint to send frontend logs to remote logging services
configureLoggingEndpoint(app);

// print endpoint
configurePrintEndpoint(app);

// autentisering og verifikasjon
configureAuthenticationAndVerification(app);

app.get(`${config.BASE_PATH}/*`, (req: any, res: any) =>
  getHtmlWithDecorator(`${BUILD_PATH}/index.html`)
    .then((html) => {
      res.send(html);
    })
    .catch((e) => {
      logInfo('Dekoratøren error', e);
      res.status(500).send(e);
    })
);

app.listen(PORT, async () => {
  await Promise.all([initIdPorten(), initTokenX()]);
  logInfo(`Server listening on ${PORT}`);
});

