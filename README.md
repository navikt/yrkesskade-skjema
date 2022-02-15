# yrkeskade-skjema

## Lokal kjøring fra kommando linje
Du må ha installert `node` versjon 16 og `yarn`

Naviger til `server`og kjør kommandoen `yarn`
Naviger til `client`og kjør kommandoen `yarn`

Naviger til rot og kjør kommando `yarn dev`

Denne kommandoen starter opp express server med frontend koden på port 3001 og et
nettleservindu vil åpnes automatisk. BASE_PATH er `yrkesskade`og må legges til i URL slik at url blir `http://localhost:3001/yrkesskade/`

### Miljøvariabler
Opprett en .env fil på rot med følgende verdier;
```bash
IDPORTEN_WELL_KNOWN_URL=https://fakedings.dev-gcp.nais.io/idporten/.well-known/openid-configuration
FAKEDINGS_URL_TOKENX=https://fakedings.dev-gcp.nais.io/fake/tokenx
IDPORTEN_COOKIE_NAME=localhost-idtoken
FAKEDINGS_URL_IDPORTEN=https://fakedings.dev-gcp.nais.io/fake/idporten
TOKENX_AUDIENCE=dev-gcp:yrkesskade:yrkesskade-melding-api
APP_INGRESS=http://localhost:3001/yrkesskade
API_URL=http://localhost:8080
NODE_ENV=local
ENV=local
```

## IDE

### VS Code
Installer plugins som ligger i [extensions.md](extensions.md)

`xargs -n1 code --install-extension < extensions.md`

Dersom `code` ikke finnes i path, må du åpne VS Code og velg Shift + CMD + P og skriv:

`Shell Command:`

Velg deretter kommandoen
`Install 'code' command in PATH`
