import { IsNotProdStrategy } from "./IsNotProdStrategy";

test('feature toggle isEnabled == true', () => {
  const parameters = { };
  const context = {};

  const isNotProdStrategy = new IsNotProdStrategy();
  expect(isNotProdStrategy.isEnabled(parameters, context)).toBe(true);
});
