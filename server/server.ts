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

app.post(`/api/skademelding`,
  async (req: any, res: any) => {
    // console.log(req.body);
    if(req.body) {
      const response = await axios.post('https://yrkesskade-melding-api.dev.intern.nav.no/api/midlertidig/skademeldinger', {
        "skademelding": req.body
      })
      // console.log(response.data)
      return res.json(response.data);
    } else {
      res.json({status: 500, message: 'Noe er fel'})
    }
  });

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
