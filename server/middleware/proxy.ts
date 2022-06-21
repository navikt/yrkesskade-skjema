import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { IService } from '@navikt/yrkesskade-backend/dist/typer';
import { NextFunction, Request, Response } from 'express';
import { attachTokenX } from '@navikt/yrkesskade-backend/dist/auth/tokenX';
import { stdoutLogger } from '@navikt/yrkesskade-logging';

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
