import { MVPStrategy } from "./MVPStrategy";

test ('is Enabled', () => {
  const parameters = {
    minimumAntallAnsatte: 5,
    organisasjonsnumre: '1,2',
    naeringskoder: '100,200',
    organisasjonsformer: 'A,B'
  }
  const context = {
    properties: {
      antallAnsatte: 10,
      organisasjonsnumre: ['1','2','3','4'],
      naeringskoder: ['100','300','500'],
      organisasjonsformer: ['A','C','D']
    }
  }

  const mvpStrategy = new MVPStrategy();
  expect(mvpStrategy.isEnabled(parameters, context)).toBe(true)
})

test ('not Enabled', () => {
  const parameters = {
    minimumAntallAnsatte: 5,
    organisasjonsnumre: '1,2',
    naeringskoder: '100,200',
    organisasjonsformer: 'A,B'
  }
  const context = {
    properties: {
      antallAnsatte: 1,
      organisasjonsnumre: ['1','2','3','4'],
      naeringskoder: ['100','300','500'],
      organisasjonsformer: ['A','C','D']
    }
  }

  const mvpStrategy = new MVPStrategy();
  expect(mvpStrategy.isEnabled(parameters, context)).toBe(false)
})
