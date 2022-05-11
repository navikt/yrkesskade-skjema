# Integrasjon

NB! Filene i denne pakken er autogenerert. Alle endringer gjort manuelt vil bli overskrevet ved neste generering

## Sette opp ny integrasjon

Legg til følgende i package.json på rot nivå.

```json
"codegen:navn-på-tjeneste": "npx openapi -i url://til.tjenesten -o ./client/src/api/navn-på-tjenste  --client axios",
 ```

 ## Generering av kode

 ```bash
 yarn codegen:navn-på-tjeneste
  ```
