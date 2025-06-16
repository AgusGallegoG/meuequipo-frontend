export enum Validations {
  PHONE = '^[+]{1}(?:[0-9\\-\\(\\)\\/\\.\\s]?){6,15}[0-9]{1}$',
  EMAIL = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
}

export function getValidationRegExp(validation: Validations): RegExp {
  return new RegExp(validation);
}
