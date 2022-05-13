export const timeframeForm = {
  timeframeWhenDate: () => cy.get('.timeframe-when-date input'),
  timeframeWhenTime: () => cy.get('[data-testid="timeframe-when-time"]'),
  timeframeWhenTimeSelect: (index: number) => cy.get(`.react-datepicker__time-list-item:nth-child(${index})`),
  timeframeWhenUnknown: () => cy.get('[data-testid=timeframe-when-unknown]'),
  timeframeWhenOverPeriod: () => cy.get('[data-testid=timeframe-when-over-period]'),
  timeframePeriodOptions: () => cy.get('[data-testid=timeframe-period-options]'),
  timeframePeriodOptionOther: () => cy.get('[data-testid=timeframe-period-option-other]'),
  timeframePeriodOptionOtherText: () => cy.get('[data-testid=timeframe-period-option-other-text]'),
  timeframePeriodFromDate: () => cy.get(`.timeframe-from-date input`),
  timeframePeriodToDate: () => cy.get(`.timeframe-to-date input`),
}
