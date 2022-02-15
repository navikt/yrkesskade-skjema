import { Organisasjon } from "../../types/brukerinfo";

const erPilNavigasjonRegex = /^(Arrow)?(Up|Down|Left|Right)$/
export const erPilNavigasjon = (key: string) => erPilNavigasjonRegex.test(key);

const arrowDown = (key: string) => key === 'ArrowDown' || key === 'Down'
const arrowUp = (key: string) => key === 'ArrowUp' || key === 'Up'

export const finnOrganisasjonsSomskalHaFokus = (
  organisasjonIFokus: Organisasjon,
  keyPressKey: string,
  erApen: boolean,
  organisasjoner: Organisasjon[]
): Organisasjon | null => {
  let nesteOrganisasjon = null;
  if (
      sjekkOmNederstPåLista(
          erApen,
          organisasjonIFokus,
          organisasjoner
      ) && arrowDown(keyPressKey)
  ) {
      nesteOrganisasjon = organisasjoner[0];
      return nesteOrganisasjon;
  }
  if (sjekkOmOverstPaLista(organisasjonIFokus, organisasjoner) && arrowUp(keyPressKey)) {
      setFocusOnFirstOrganisation();
      return null;
  }
  const indeksTilOrganisasjonIFlatListe = finnIndeksIUtpakketListe(
      organisasjonIFokus.organisasjonsnummer,
      organisasjoner
  );

      const indeksTilOrganisasjonOrganisasjonstre = finnIndeksIorganisasjoner(
          organisasjonIFokus.organisasjonsnummer,
          organisasjoner
      );
      if (arrowDown(keyPressKey)) {
          if (erApen) {
              nesteOrganisasjon = organisasjoner[indeksTilOrganisasjonIFlatListe + 1];
          } else {
              nesteOrganisasjon =
                  organisasjoner[indeksTilOrganisasjonOrganisasjonstre + 1];
          }
      }
      if (arrowUp(keyPressKey)) {
          nesteOrganisasjon = organisasjoner[indeksTilOrganisasjonOrganisasjonstre - 1];
      }

  return nesteOrganisasjon;
};

export const finnIndeksIorganisasjoner = (
  enhetsOrganisasjonsnummer: string,
  array: Organisasjon[]
) => {
  return array
      .map((organisasjon) => organisasjon.organisasjonsnummer)
      .indexOf(enhetsOrganisasjonsnummer);
};

export const finnIndeksIUtpakketListe = (organisasjonsnummer: string, array: Organisasjon[]) => {
  return array
      .map((organisasjon) => organisasjon.organisasjonsnummer)
      .indexOf(organisasjonsnummer);
};

export const sjekkOmNederstPåLista = (
  erApen: boolean,
  organisasjon: Organisasjon,
  organisasjoner: Organisasjon[]
) => {
  if (!erApen) {
      const indeksTilOrganisasjon = finnIndeksIorganisasjoner(
          organisasjon.organisasjonsnummer,
          organisasjoner
      );
      return indeksTilOrganisasjon === organisasjoner.length - 1;
  }
};

const sjekkOmOverstPaLista = (organisasjon: Organisasjon, organisasjoner: Organisasjon[]) => {
  return organisasjon.organisasjonsnummer === organisasjoner[0].organisasjonsnummer;
};

export const endreTabIndexAlleOrganisasjonerOgSokefelt = (
  organisasjoner: Organisasjon[],
  tabIndex: number
) => {
  endreTabIndeksGittId('bedriftsmeny-sokefelt', tabIndex);
  endreTabIndeksGittId('valgtjuridiskenhet', tabIndex);
  endreTabIndeksGittId('valgtunderenhet', tabIndex);
  organisasjoner.forEach((organisasjon) => {
      endreTabIndeksGittId(
          'organisasjons-id-' + organisasjon.organisasjonsnummer,
          tabIndex
      );
  });
};

export const endreTabIndeksGittId = (idString: string, tabIndex: number) => {
  const element = document.getElementById(idString);
  if (element) {
      element.tabIndex = tabIndex;
  }
};

export const setFocusOnFirstOrganisation = () => {
  document.getElementById('valgtunderenhet')?.focus();
};

export const setfokusPaMenyKnapp = () => {
  document.getElementById('virksomhetsvelger__button')?.focus();
};
