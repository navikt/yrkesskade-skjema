import { Strategy } from 'unleash-client';

export class IsNotProdStrategy extends Strategy {
  constructor() {
    super('isNotProd');
  }

  isEnabled(parameters, context) {
    return process.env.ENV !== 'production';
  }
}
