# yrkeskade-skjema

## Lokal kjøring fra kommando linje
Du må ha installert `node` versjon 16 og `yarn`

Naviger til `server`og kjør kommandoen `yarn`
Naviger til `client`og kjør kommandoen `yarn`

Naviger til rot og kjør kommando `yarn dev`

Denne kommandoen starter opp express server med frontend koden på port 3001 og et 
nettleservindu vil åpnes automatisk. BASE_PATH er `yrkesskade`og må legges til i URL slik at url blir `http://localhost:3001/yrkesskade/`

## IDE

### VS Code
Installer plugins som ligger i [extensions.md](extensions.md)

`xargs -n1 code --install-extension < extensions.md`

Dersom `code` ikke finnes i path, må du åpne VS Code og velg Shift + CMD + P og skriv:

`Shell Command:` 

Velg deretter kommandoen 
`Install 'code' command in PATH`