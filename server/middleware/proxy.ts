import { ClientRequest, IncomingMessage, ServerResponse } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request } from 'express';
import { exchangeToken } from '../tokenx';
import { logSecure, logError } from '@navikt/yrkesskade-logging';

const restream = (
  proxyReq: ClientRequest,
  req: IncomingMessage,
  _res: ServerResponse
) => {
  const httpRequest = (req as Request);
  const requestBody = httpRequest.body;

  Object.keys(req.headers).forEach((key) => {
    proxyReq.setHeader(key, req.headers[key]);
  });

  if (requestBody) {
    const bodyData = JSON.stringify(requestBody);
    proxyReq.setHeader('Content-Type', 'application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
  }
};

const errorHandler = (err, req, res) => {
  if (process.env.ENV !== 'production') {
    logError('Feil', err);
  } else {
    logSecure(err);
  }
}

export const doProxy = (path: string, target: string) => {
    return createProxyMiddleware(path, {
    changeOrigin: true,
    logLevel: process.env.ENV === 'prod' ? 'silent' : 'debug',
    secure: true,
    xfwd: true,
    //onProxyReq: restream,
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
