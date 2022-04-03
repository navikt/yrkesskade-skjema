import { OrganisasjonsnummerStrategy } from "./OrganisasjonsNummerStrategy";


test('feature toggle isEnabled == true', () => {
  const parameters = { orgnumre: '1,2,3,4,5' };
  const context = {properties: { organisasjonsnumre: ['4','5']}};

  const organisasjonsnummerStrategy = new OrganisasjonsnummerStrategy();
  expect(organisasjonsnummerStrategy.isEnabled(parameters, context)).toBe(true);
});

test('feature toggle isEnabled == false', () => {
  const parameters = { orgnumre: '1,2,3,4,5' };
  const context = {properties: { organisasjonsnumre: ['6','7']}};

  const organisasjonsnummerStrategy = new OrganisasjonsnummerStrategy();
  expect(organisasjonsnummerStrategy.isEnabled(parameters, context)).toBe(false);
});

test('ingen orgnummer i context - isEnabled == false', () => {
  const parameters = { orgnumre: '1,2,3,4,5' };
  const context = {properties: { }};

  const organisasjonsnummerStrategy = new OrganisasjonsnummerStrategy();
  expect(organisasjonsnummerStrategy.isEnabled(parameters, context)).toBe(false);

  const harOrgnummerliste = {properties: { orgnumre: [] }};
  expect(organisasjonsnummerStrategy.isEnabled(parameters, context)).toBe(false);
});

test('ingen orgnummer i parameters - isEnabled == false', () => {
  const parameters = {  };
  const context = {properties: { }};

  const organisasjonsnummerStrategy = new OrganisasjonsnummerStrategy();
  expect(organisasjonsnummerStrategy.isEnabled(parameters, context)).toBe(false);

  const harOrgnummerliste = {properties: { orgnumre: ['1', '2'] }};
  expect(organisasjonsnummerStrategy.isEnabled(parameters, context)).toBe(false);
});
