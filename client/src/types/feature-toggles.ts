export enum EFeatureToggle {
  DIGITAL_SKJEMA_INNSENDING = 'DIGITAL_SKJEMA_INNSENDING',
  TEST = 'TEST',
  ER_IKKE_PROD = "ER_IKKE_PROD"
}
export const ToggleKeys: Record<EFeatureToggle, string> = {
  [EFeatureToggle.DIGITAL_SKJEMA_INNSENDING]: 'yrkesskade.digital-skjema-innsending',
  [EFeatureToggle.TEST]: 'yrkesskade.test',
  [EFeatureToggle.ER_IKKE_PROD]: 'yrkesskade.er-ikke-prod'
};
export type EAllFeatureToggles = Record<EFeatureToggle, boolean>;
