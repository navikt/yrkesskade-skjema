import { ClientRequest, IncomingMessage, ServerResponse } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request } from 'express';
import { exchangeToken } from '../tokenx';

const restream = (
  proxyReq: ClientRequest,
  req: IncomingMessage,
  _res: ServerResponse
) => {
  const httpRequest = (req as Request);
  const requestBody = httpRequest.body;

  if (httpRequest.headers.authorization) {
    proxyReq.setHeader('Authorization', httpRequest.headers.authorization)
  }

  if (requestBody) {
    const bodyData = JSON.stringify(requestBody);
    proxyReq.setHeader('Content-Type', 'application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
  }
};

const errorHandler = (err, req, res) => {
   // tslint:disable-next-line:no-console
  console.error('error:',  { err, req, res });
}

export const doProxy = (path: string, target: string) => {
    return createProxyMiddleware(path, {
    changeOrigin: true,
    logLevel: process.env.ENV === 'prod' ? 'silent' : 'debug',
    secure: true,
    xfwd: true,
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
