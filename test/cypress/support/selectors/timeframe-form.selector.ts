export const timeframeForm = {
  timeframeWhenDate: () => cy.get('.timeframe-when-date input'),
  timeframeWhenTime: () => cy.get('.timeframe-when-time'),
  timeframeWhenTimeSelect: (index: number) => cy.get(`.react-datepicker__time-list-item:nth-child(${index})`),
  timeframeWhenUnknown: () => cy.get('[data-testid=timeframe-when-unknown]'),
  timeframeWhenOverPeriod: () => cy.get('[data-testid=timeframe-when-over-periode]'),
  timeframePeriodOptions: () => cy.get('[data-testid=timeframe-period-options]'),
  timeframePeriodOptionOther: () => cy.get('[data-testid=timeframe-period-option-other]'),
  timeframePeriodOptionOtherText: () => cy.get('[data-testid=timeframe-period-option-other-text]')
}
