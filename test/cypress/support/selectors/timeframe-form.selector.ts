export const timeframeForm = {
  timeframeWhenDate: () => cy.get('[data-testid=timeframe-when-date]'),
  timeframeWhenTime: () => cy.get('[data-testid=timeframe-when-time]'),
  timeframeWhenUnknown: () => cy.get('[data-testid=timeframe-when-unknown]'),
  timeframeWhenOverPeriod: () => cy.get('[data-testid=timeframe-when-over-periode]'),
  timeframePeriodOptions: () => cy.get('[data-testid=timeframe-period-options]'),
  timeframePeriodOptionOther: () => cy.get('[data-testid=timeframe-period-option-other]'),
  timeframePeriodOptionOtherText: () => cy.get('[data-testid=timeframe-period-option-other-text]')
}
