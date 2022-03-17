import dotenv from 'dotenv';
dotenv.config();

const APP_URL = process.env.APP_URL || 'localhost:3000';
const API_URL = process.env.API_URL || 'https://yrkesskade-melding-api.dev.intern.nav.no';
const DOKGEN_URL = process.env.DOKGEN_URL || 'https://https://yrkesskade-dokgen.dev.intern.nav.no';
const IDPORTEN_COOKIE_NAME = 'local-idtoken';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  BASE_PATH: '/yrkesskade',
  APP_URL,
  API_URL,
  DOKGEN_URL,
  IDPORTEN_COOKIE_NAME
};
