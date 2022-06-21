import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { logError, stdoutLogger } from '@navikt/yrkesskade-logging';
import { v4 as uuidv4 } from 'uuid';
import { IService } from '@navikt/yrkesskade-backend/dist/typer';
import clientRegistry from '@navikt/yrkesskade-backend/dist/auth/clientRegistry';
import { NextFunction, Request, Response } from 'express';
import { TokenSet } from 'openid-client';
import { utledAudience } from '@navikt/yrkesskade-backend/dist/auth/tokenUtils';
import { exchangeToken } from '@navikt/yrkesskade-backend/dist/auth/tokenX';

export const doProxy = (service: IService) => {
  return createProxyMiddleware(service.proxyPath, {
    changeOrigin: true,
    logLevel: process.env.ENV === 'prod' ? 'info' : 'debug',
    onProxyReq: fixRequestBody,
    logProvider: () => stdoutLogger,
    pathRewrite: (path: string, _req: Request) => {
      return path.replace(service.proxyPath, '');
    },
    secure: true,
    target: `${service.proxyUrl}`,
  });
};

export const attachToken = (service: IService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    attachTokenX(service, req, res, next);
  };
};

const attachTokenX = (
  service: IService,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const klient = clientRegistry.getClient('tokenX');
  const audience = utledAudience(service);
  exchangeToken(klient, audience, req)
    .then((tokenSet: TokenSet) => {
      req.headers['Nav-Call-Id'] = uuidv4();
      req.headers.Authorization = `Bearer ${tokenSet.access_token}`;
      return next();
    })
    .catch((e) => {
      logError(`Uventet feil - exchangeToken`, e);
      res.status(500).json({
        status: 'FEILET',
        melding: 'Uventet feil. Vennligst prøv på nytt.',
      });
    });
};
