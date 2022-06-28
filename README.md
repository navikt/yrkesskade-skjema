# yrkeskade-skjema

## Lokal kjøring fra kommando linje
Du må ha installert `node` versjon 16 og `yarn`

Installer alle avhengigheter ved å kjøre kommandoen `yarn install:all`

Start utvikling server med kommandoen `yarn dev`

Denne kommandoen starter opp express server med frontend koden på port `3001` og et
nettleservindu vil åpnes automatisk. BASE_PATH er `yrkesskade`og må legges til i URL slik at url blir `http://localhost:3001/yrkesskade/`

### Miljøvariabler
Opprett en .env fil på rot med følgende verdier;
```bash
IDPORTEN_WELL_KNOWN_URL=https://fakedings.dev-gcp.nais.io/idporten/.well-known/openid-configuration
FAKEDINGS_URL_TOKENX=https://fakedings.dev-gcp.nais.io/fake/tokenx
FAKEDINGS_URL_IDPORTEN=https://fakedings.dev-gcp.nais.io/fake/idporten
TOKENX_AUDIENCE=dev-gcp:yrkesskade:yrkesskade-melding-api
API_URL=http://localhost:8080 # eller adressen for backend
NODE_ENV=local
ENV=local
```

## Test

Cypress tester med grafisk grensesnitt - velg hvilken test fil som skal kjøres
```bash
cd test
yarn cypress:open
```

Cypress tester med kommandolinje - alle testfilene som ligger i `test/cypress/e2e` katalogen blir kjørt
```bash
cd test
yarn cypress:run
```

### Testdekning

Etter å ha kjørt E2E testene, blir det generert kodedeknings rapport som ligger i `test/coverage/lcov-report/index.html` - CI verktøy har et krav på en minimum 87% linjer
## IDE

### VS Code
Installer plugins som ligger i [extensions.md](extensions.md)

`xargs -n1 code --install-extension < extensions.md`

Dersom `code` ikke finnes i path, må du åpne VS Code og velg Shift + CMD + P og skriv:

`Shell Command:`

Velg deretter kommandoen
`Install 'code' command in PATH`

## Kodegenering OpenAPI

Kodegenering av klient kode for yrkesskade-melding-api og kodeverk

```bash
yarn codegen:yrkesskade
yarn codegen:kodeverk
```
