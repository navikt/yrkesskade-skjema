export enum RolleMedSkjemaTilgang {
  LONN_PERSONAL = 3,
  INNEHAVER = 152,
  KOMPLEMENTAR = 157,
  BESTYRENDE_LEDER = 191,
  DELTAKER_DELT_ANSVAR = 173,
  DELTAKER_FULLT_ANSVAR = 174,
  REGNSKAP_LONN = 5607,
  REGNSKAP_MED_SIGNERING = 5608,
  REGNSKAP_UTEN_SIGNERING = 5609,
  NORSK_REPRESENTANT_UTL_ENHET = 193,
  HELSE_SOSIAL_VELFERDTJENESTER = 131,
  DAGLIG_LEDER_ADM_DIR = 195,
  BOSTYRER = 196,
  KONKURSBO_SKRIVE = 2,
  BEGRENSET_SIGNERINGRETTIGHET = 8,
  ENERGI_MILJO_KLIMA = 12,
  SAMFERDSEL = 10,
  SIGNERER_SAMORDVNET_REGISTERMELDING = 130,
  TAUSHETSBELAGT_POST = 25000,
}

export const rollerMedSkjematilgang: number[] = Object.values(RolleMedSkjemaTilgang).map((val) => val as number);
