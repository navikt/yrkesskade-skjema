import express from 'express';
import path from 'path';
import { getHtmlWithDecorator } from './dekorator';
import { initIdPorten } from './idporten';
import config from './config';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import cookies from 'cookie-parser';
import { exchangeToken, initTokenX } from './tokenx';
import { redirectTilLogin } from './autentisering';
import {
  konfigurerAllFeatureTogglesEndpoint,
  konfigurerFeatureTogglesEndpoint,
} from './routes/feature-toggles';

const BUILD_PATH = path.join(__dirname, '../build');
const PORT = process.env.PORT || 3000;
const app = express();

dotenv.config();

app.use(cors());
app.use(cookies());
app.use(express.json());
app.use(express.static('../build'));

// health checks
app.get([`/internal/isAlive`, `/internal/isReady`], (req: any, res: any) =>
  res.sendStatus(200)
);

app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello' });
});

app.post(`/api/skademelding`, async (req: any, res: any) => {
  if (req.body) {
    const { access_token } = await exchangeToken(req);
    const response = await axios.post(
      'https://yrkesskade-melding-api.dev.intern.nav.no/api/midlertidig/skademeldinger',
      {
        skademelding: req.body,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.json(response.data);
  } else {
    res.json({ status: 500, message: 'Noe er feil' });
  }
});

// feature toggle endpoints
konfigurerFeatureTogglesEndpoint(app);
konfigurerAllFeatureTogglesEndpoint(app);

app.get(`${config.BASE_PATH}/success`, (req, res) => {
  const loginserviceToken = req.cookies['selvbetjening-idtoken'];
  const redirectUrl = req.query.redirect as string;
  if (loginserviceToken && redirectUrl?.startsWith(process.env.APP_INGRESS)) {
    res.redirect(redirectUrl);
  } else if (redirectUrl?.startsWith(process.env.APP_INGRESS)) {
    res.redirect(`${process.env.LOGIN_URL}${redirectUrl}`);
  } else {
    res.redirect(`${process.env.LOGIN_URL}${process.env.APP_INGRESS}`);
  }
});

app.get(
  `${config.BASE_PATH}/redirect-til-login`,
  (request: any, response: any) => {
    redirectTilLogin(request, response);
  }
);

app.get(`${config.BASE_PATH}/innlogget`, (req, res) => {
  const loginserviceToken = req.cookies['selvbetjening-idtoken'];
  if (loginserviceToken) {
    // tslint:disable-next-line:no-console
    console.log('innlogget? ja (cookie selvbetjening-idtoken eksisterer)');
    res.status(200).send();
  } else {
    // tslint:disable-next-line:no-console
    console.log('innlogget? nei (cookie selvbetjening-idtoken mangler)');
    res.status(401).send();
  }
});

app.get(`${config.BASE_PATH}/*`, (req: any, res: any) =>
  getHtmlWithDecorator(`${BUILD_PATH}/index.html`)
    .then((html) => {
      res.send(html);
    })
    .catch((e) => {
      // tslint:disable-next-line:no-console
      console.log('Dekoratøren error', e);
      res.status(500).send(e);
    })
);

app.listen(PORT, async () => {
  await Promise.all([initIdPorten(), initTokenX()]);
  // tslint:disable-next-line:no-console
  console.log(`Server listening on ${PORT}`);
});
