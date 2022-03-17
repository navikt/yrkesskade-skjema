import {
  PdfAdresse,
  PdfDokumentInfo,
  PdfHendelsesfakta,
  PdfInnmelder,
  PdfPeriode,
  PdfSkade,
  PdfSkadelidt,
  PdfSkademelding,
  PdfTekster,
  PdfTid,
  PdfTidspunkt,
  PdfUlykkessted,
} from './models';
import { Adresse, Hendelsesfakta, Innmelder, Skade, Skadelidt, Skademelding, SkadetDel, Tid, Ulykkessted } from '../../client/src/api/yrkesskade';
import dayjs from 'dayjs';

const DATO_FORMAT = 'DD.MM.YYYY';
const KLOKKESLETT_FORMAT = 'HH:mm';

export const pdfSkademeldingMapper = (
  skademelding: Skademelding
): PdfSkademelding => {
  return {
    innmelder: mapInnmelder(skademelding.innmelder),
    skadelidt: mapSkadelidt(skademelding.skadelidt),
    skade: mapSkade(skademelding.skade),
    hendelsesfakta: mapHendelsesfakta(skademelding.hendelsesfakta),
    dokumentInfo: hentDokumentinfo(),
  };
};

const mapInnmelder = (innmelder: Innmelder): PdfInnmelder => {
  return {
    norskIdentitetsnummer: {
      label: 'Fødselsnummer',
      verdi: innmelder.norskIdentitetsnummer,
    },
    navn: { label: 'Navn', verdi: ''},
    altinnrolleIDer: {
      label: 'Roller hentet fra Altinn',
      verdi: innmelder.altinnrolleIDer || [''],
    },
    paaVegneAv: { label: 'Org.nr', verdi: innmelder.paaVegneAv },
    innmelderrolle: {
      label: 'Innmelderrolle',
      verdi: innmelder.innmelderrolle,
    },
  };
};

const mapSkadelidt = (skadelidt: Skadelidt): PdfSkadelidt => {
  return {
    norskIdentitetsnummer: { label: 'Fødselsnummer', verdi: skadelidt.norskIdentitetsnummer},
    dekningsforhold: {
      organisasjonsnummer: { label: 'Org.nr', verdi: skadelidt.dekningsforhold.organisasjonsnummer},
      rolletype: { label: 'Rolle', verdi: skadelidt.dekningsforhold.rolletype },
      stillingstittelTilDenSkadelidte: { label: 'Stilling', verdi: skadelidt.dekningsforhold.stillingstittelTilDenSkadelidte }
    }
   }
}

const mapSkade = (skade: Skade): PdfSkade => {
  return {
    antattSykefravaerTabellH: { label: 'Antatt sykefravær', verdi: skade.antattSykefravaerTabellH},
    skadedeDeler: skade.skadedeDeler.map((skadetDel: SkadetDel) => ({
      kroppsdelTabellD: { label: 'Hvor på kroppen er skaden', verdi: skadetDel.kroppsdelTabellD},
      skadeartTabellC: { label: 'Hva slags skade er det', verdi: skadetDel.skadeartTabellC }
    })),
    alvorlighetsgrad: { label: 'Hvor alvorlig var hendelsen', verdi: skade.alvorlighetsgrad || ''},
  }
}

const mapHendelsesfakta = (hendelsesfakta: Hendelsesfakta): PdfHendelsesfakta => {
  return {
    tid: mapTid(hendelsesfakta.tid),
    naarSkjeddeUlykken: { label: 'Innenfor hvilket tidsrom inntraff ulykken', verdi: hendelsesfakta.naarSkjeddeUlykken },
    hvorSkjeddeUlykken: { label: 'Hvor skjedde ulykken', verdi: hendelsesfakta.hvorSkjeddeUlykken },
    ulykkessted: mapUlykkessted(hendelsesfakta.ulykkessted),
    aarsakUlykkeTabellAogE: { label: 'Hva var årsaken til hendelsen og bakgrunn for årsaken', verdi: hendelsesfakta.aarsakUlykkeTabellAogE },
    bakgrunnsaarsakTabellBogG: { label: 'Hva var bakgrunnen til hendelsen', verdi: hendelsesfakta.bakgrunnsaarsakTabellBogG },
    stedsbeskrivelseTabellF: { label: 'Hvilken type arbeidsplass er det', verdi: hendelsesfakta.stedsbeskrivelseTabellF },
    utfyllendeBeskrivelse: { label: 'Utfyllende beskrivelse', verdi: hendelsesfakta.utfyllendeBeskrivelse || '' }
  }
}

const mapTid = (tid: Tid): PdfTid => {
  if (tid.tidstype === Tid.tidstype.TIDSPUNKT) {
    return {
      tidspunkt: { label: 'Tidspunkt', verdi: { dato: dayjs(tid.tidspunkt).format(DATO_FORMAT),  klokkeslett: dayjs(tid.tidspunkt).format(KLOKKESLETT_FORMAT) } as PdfTidspunkt },
      tidstype: tid.tidstype,
    }
  } else if (tid.tidstype === Tid.tidstype.PERIODE) {
    return {
      tidstype: tid.tidstype,
      periode: { label: 'Periode', verdi: {fra: dayjs(tid.periode.fra).format(DATO_FORMAT), til: dayjs(tid.periode.til).format(DATO_FORMAT) } as PdfPeriode }
    }
  }

  return {
    tidstype: Tid.tidstype.UKJENT
  }
}

const mapUlykkessted = (ulykkessted: Ulykkessted): PdfUlykkessted => {
  return {
    sammeSomVirksomhetensAdresse: { label: 'Skjedde ulykken på samme adresse', verdi: ulykkessted.sammeSomVirksomhetensAdresse ? 'Ja' : 'Nei'},
    adresse: { label: 'Adresse', verdi: mapAdresse(ulykkessted.adresse) }
  }
}

const mapAdresse = (adresse: Adresse): PdfAdresse => {
  return {
    adresselinje1: adresse.adresselinje1,
    adresselinje2: adresse.adresselinje2,
    adresselinje3: adresse.adresselinje3,
    land: adresse.land,
  }
}

const hentDokumentinfo = (): PdfDokumentInfo => {
  return {
    dokumentnavn: 'Kopi av skademelding',
    dokumentDatoPrefix: 'Kopi generert',
    dokumentDato: dayjs(new Date()).format(DATO_FORMAT),
    dokumentnummer: 'Dette dokumenter er en oppsummering av det som er sendt til NAV',
    tekster: hentDokumenttekster(),
  };
};

const hentDokumenttekster = (): PdfTekster => {
  return {
    innmelderSeksjonstittel: 'Om innmelder',
    omSkadenFlereSkader: 'Flere skader',
    omSkadenSeksjonstittel: 'Om skaden',
    omUlykkenSeksjonstittel: 'Om ulykken',
    skadelidtSeksjonstittel: 'Den skadelidte',
    tidOgStedSeksjonstittel: 'Tid og sted',
  };
};
