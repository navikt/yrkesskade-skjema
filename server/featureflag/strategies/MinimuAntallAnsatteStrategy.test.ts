import { MinimumAntallAnsatteStrategy } from "./MimimumAntallAnsatteStrategy";

test('flere ansatte enn parameter: isEnabled == true', () => {
  const parameters = { minimumAntallAnsatte: 5 };
  const context = { properties: { antallAnsatte: 10 }};

  const minimumAntallAnsatteStrategy = new MinimumAntallAnsatteStrategy();
  expect(minimumAntallAnsatteStrategy.isEnabled(parameters, context)).toBe(true);
});

test('færre ansatte enn parameter: isEnabled == false', () => {
  const parameters = { minimumAntallAnsatte: 5 };
  const context = { properties: { antallAnsatte: 1 }};

  const minimumAntallAnsatteStrategy = new MinimumAntallAnsatteStrategy();
  expect(minimumAntallAnsatteStrategy.isEnabled(parameters, context)).toBe(false);
});

test('ingen ansatte i context: isEnabled == false', () => {
  const parameters = { minimumAntallAnsatte: 5 };
  const context = { properties: {  }};

  const minimumAntallAnsatteStrategy = new MinimumAntallAnsatteStrategy();
  expect(minimumAntallAnsatteStrategy.isEnabled(parameters, context)).toBe(false);
});

test('ingen ansatte i context eller parameter: isEnabled == true', () => {
  const parameters = { };
  const context = { properties: {  }};

  const minimumAntallAnsatteStrategy = new MinimumAntallAnsatteStrategy();
  expect(minimumAntallAnsatteStrategy.isEnabled(parameters, context)).toBe(true);
});

test('ingen ansatte i parameter: isEnabled == true', () => {
  const parameters = {  };
  const context = { properties: { antallAnsatte: 1 }};

  const minimumAntallAnsatteStrategy = new MinimumAntallAnsatteStrategy();
  expect(minimumAntallAnsatteStrategy.isEnabled(parameters, context)).toBe(true);
});

test('0 ansatte i parameter: isEnabled == true', () => {
  const parameters = {  };
  const context = { properties: { antallAnsatte: 0 }};

  const minimumAntallAnsatteStrategy = new MinimumAntallAnsatteStrategy();
  expect(minimumAntallAnsatteStrategy.isEnabled(parameters, context)).toBe(true);
});
