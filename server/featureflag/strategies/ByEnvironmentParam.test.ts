import { ByEnvironmentParam } from './ByEnvironmentParam';

describe('ByEnvironmentParam', () => {
  test('ingen parameter, isEnabled == true', () => {
    const parameters = {};
    const context = {};

    const byEnvironmentParam = new ByEnvironmentParam();
    expect(byEnvironmentParam.isEnabled(parameters, context)).toBe(true);
  });

  test('test environment parameter, isEnabled == true', () => {
    const parameters = { environment: 'test' };
    const context = {};

    const byEnvironmentParam = new ByEnvironmentParam();
    expect(byEnvironmentParam.isEnabled(parameters, context)).toBe(true);
  });

  test('local environment parameter, isEnabled == false', () => {
    const parameters = { environment: 'local' };
    const context = {};

    const byEnvironmentParam = new ByEnvironmentParam();
    expect(byEnvironmentParam.isEnabled(parameters, context)).toBe(false);
  });
});
