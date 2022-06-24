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
  timeframePeriodAdd: () => cy.get('[data-testid="add-period-button"]'),
  timeframePeriodRemove: (index: number = 0) => cy.get(`[data-testid="periode-tabell-fjern"]:nth-child(${index + 1})`),
  timeframePeriodTable: () => cy.get('[data-testid="periode-rad"]'),
  timeframeSykdomPaavist: () => cy.get('.timeframe-when-date input')
}
