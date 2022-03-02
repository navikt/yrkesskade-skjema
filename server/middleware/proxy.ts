import { ClientRequest, IncomingMessage, ServerResponse } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request, Response } from 'express';
import { exchangeToken } from '../tokenx';
import {
  logError,
  logInfo,
  logSecure,
  stdoutLogger,
} from '@navikt/yrkesskade-logging';

const restream = (
  proxyReq: ClientRequest,
  req: IncomingMessage,
  _res: ServerResponse
) => {
  const httpRequest = req as Request;
  const requestBody = httpRequest.body;

  if (requestBody && requestBody.length > 0) {
    const bodyData = JSON.stringify(requestBody);
    proxyReq.setHeader('Content-Type', 'application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
    proxyReq.end();
  }
};

const errorHandler = (err, req, res) => {
  if (process.env.ENV !== 'production') {
    logError('Feil', err);
  } else {
    logSecure(err);
  }
};

export const doProxy = (path: string, target: string) => {
  return createProxyMiddleware(path, {
    changeOrigin: true,
    logLevel: process.env.ENV === 'prod' ? 'silent' : 'debug',
    logProvider: () => stdoutLogger,
    onProxyReq: restream,
    onError: errorHandler,
    router: async (req) => {
      const tokenSet = await exchangeToken(req);
      if (!tokenSet?.expired() && tokenSet?.access_token) {
        req.headers.authorization = `Bearer ${tokenSet.access_token}`;
      }

      return undefined;
    },
    target: `${target}`,
  });
};
