import { Express } from "express";
import config from "../config";
import { isEnabled } from "../unleash";
import { ToggleKeys } from '../../client/src/types/feature-toggles';

const toggleFetchHandler = (req, res) => {
  const toggleId = req.params.id;
  if (!toggleId) {
    res.status(404).send('Mangler toggle-id')
  }
  res.send(isEnabled(toggleId));
};

export const konfigurerFeatureTogglesEndpoint = (app: Express): Express => {
  // Matcher bare toggles som tilhører oss, bruker {0,} pga en express-quirk
  // ref http://expressjs.com/en/guide/routing.html#route-parameters
  app.get(`${config.BASE_PATH}/toggles/:id(yrkesskade.[a-zA-Z-]{0,})`, toggleFetchHandler);
  return app;
};

const fetchAllFeatureTogglesHandler = (req, res) => {
  res.send(Object.keys(ToggleKeys).reduce((keys, key) => ({ ...keys, [key]: isEnabled(ToggleKeys[key])}), {}));
};

export const konfigurerAllFeatureTogglesEndpoint = (app: Express): Express => {
  app.get(`${config.BASE_PATH}/toggles/`, fetchAllFeatureTogglesHandler);
  return app;
};

