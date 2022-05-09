export enum EFeatureToggle {
  DIGITAL_SKJEMA_INNSENDING = 'DIGITAL_SKJEMA_INNSENDING',
  TEST = 'TEST',
  ER_IKKE_PROD = 'ER_IKKE_PROD',
  SKADEMELDING_TILGJENGELIG = 'SKADEMELDING_TILGJENGELIG'
}
export const ToggleKeys: Record<EFeatureToggle, string> = {
  [EFeatureToggle.DIGITAL_SKJEMA_INNSENDING]: 'yrkesskade.digital-skjema-innsending',
  [EFeatureToggle.TEST]: 'yrkesskade.test',
  [EFeatureToggle.ER_IKKE_PROD]: 'yrkesskade.er-ikke-prod',
  [EFeatureToggle.SKADEMELDING_TILGJENGELIG]: 'yrkesskade.skademelding.tilgjengelig'
};
export type EAllFeatureToggles = Record<EFeatureToggle, boolean>;
