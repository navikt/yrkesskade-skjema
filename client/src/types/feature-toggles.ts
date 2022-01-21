export enum EFeatureToggle {
  DIGITAL_SKJEMA_INNSENDING = 'DIGITAL_SKJEMA_INNSENDING',
  TEST = 'TEST',
}
export const ToggleKeys: Record<EFeatureToggle, string> = {
  [EFeatureToggle.DIGITAL_SKJEMA_INNSENDING]: 'yrkesskade.digital-skjema-innsending',
  [EFeatureToggle.TEST]: 'yrkesskade.test',
};
export type EAllFeatureToggles = Record<EFeatureToggle, boolean>;
