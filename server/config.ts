const APP_URL = process.env.APP_URL || 'localhost:3000'
const API_URL = process.env.API_URL || 'https://yrkesskade-melding-api.dev.intern.nav.no'
const IDPORTEN_COOKIE_NAME = process.env.IDPORTEN_COOKIE_NAME || 'selvbetjening-idtoken'

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  BASE_PATH: '/yrkesskade',
  APP_URL,
  API_URL,
  IDPORTEN_COOKIE_NAME
};
