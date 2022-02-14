import { Express } from 'express';
import { appendHeaders } from '../middleware/headers';
import { doProxy } from '../proxy'

export const configureApiEndpoint = (app: Express, apiBasePath: string, proxyApiUrl) => {
  app.use(apiBasePath, appendHeaders, doProxy(apiBasePath, proxyApiUrl));
}
