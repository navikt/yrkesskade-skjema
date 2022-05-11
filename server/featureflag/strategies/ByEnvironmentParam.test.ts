import { ByEnvironmentParam } from "./ByEnvironmentParam";

test('feature toggle isEnabled == true', () => {
  const parameters = { };
  const context = {};

  const byEnvironmentParam = new ByEnvironmentParam();
  expect(byEnvironmentParam.isEnabled(parameters, context)).toBe(true);
});
