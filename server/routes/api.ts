import { Express } from 'express';
import { doProxy } from '../middleware/proxy'

export const configureApiEndpoint = (app: Express, apiBasePath: string, proxyApiUrl) => {
  app.use(apiBasePath, doProxy(apiBasePath, proxyApiUrl));
}
