import { ClientRequest, IncomingMessage, ServerResponse } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request } from 'express';

const restream = (
  proxyReq: ClientRequest,
  req: IncomingMessage,
  _res: ServerResponse
) => {
  const requestBody = (req as Request).body;
  if (requestBody) {
    const bodyData = JSON.stringify(requestBody);
    proxyReq.setHeader('Content-Type', 'application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
  }

   // tslint:disable-next-line:no-console
  console.log(`request headers`, req.headers);

   // tslint:disable-next-line:no-console
   console.log('proxyReq headers', proxyReq.getHeaders());
};

const errorHandler = (err, req, res) => {
   // tslint:disable-next-line:no-console
  console.error('error:',  { err, req, res });
}

export const doProxy = (path: string, target: string) => {
  return createProxyMiddleware(path, {
    changeOrigin: true,
    logLevel: process.env.NODE_ENV !== 'production' ? 'debug' : 'debug',
    secure: true,
    onProxyReq: restream,
    onError: errorHandler,
    target: `${target}`,
  });
};
