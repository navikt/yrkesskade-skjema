import express from "express";
import path from "path";
import { getHtmlWithDecorator } from "./dekorator";
import config from './config';
import cors from 'cors';
import axios from 'axios';

const BUILD_PATH = path.join(__dirname, "../build");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static("../build"));
// health checks
app.get(
  [
    `/internal/isAlive`,
    `/internal/isReady`,
  ],
  (req: any, res: any) => res.sendStatus(200)
);

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello" });
});

app.get(
  `/api/skademeldinger`,
  async (req: any, res: any) => {
    const response = await axios.get('https://yrkesskade-melding-api.dev.intern.nav.no/api/midlertidig/skademeldinger');
    // tslint:disable-next-line:no-console
    console.log('apikall', response);
    return res.json(response.data);
  });

// app.post(`/api/skademelding`,
//   (req: any, res: any) => {
//     axios.post('https://yrkesskade-melding-api.dev.intern.nav.no/api/midlertidig/skademeldinger', {
//       "skademelding": {
//         "fodselsnummer": "696969420",
//         "navn": "Jarand"
//       }
//     })
//   });

  app.get(`${config.BASE_PATH}/*`, (req: any, res: any) =>
  getHtmlWithDecorator(`${BUILD_PATH}/index.html`)
    .then((html) => {
      res.send(html);
    })
    .catch((e) => {
      // tslint:disable-next-line:no-console
      console.log("Dekoratøren error", e);
      res.status(500).send(e);
    })
);

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server listening on ${PORT}`);
});
