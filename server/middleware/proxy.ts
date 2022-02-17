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
};

const errorHandler = (err, req, res) => {
   // tslint:disable-next-line:no-console
  console.error('error:',  { err, req, res });
}

export const doProxy = (path: string, target: string) => {
  // tslint:disable-next-line:no-console
  console.log(`redirect ${path} to ${target}`);

  const proxy = createProxyMiddleware(path, {
    changeOrigin: true,
    logLevel: process.env.ENV === 'prod' ? 'silent' : 'debug',
    secure: true,
    onProxyReq: restream,
    onError: errorHandler,
    target: `${target}`,
  });

  // tslint:disable-next-line:no-console
  console.log(`proxy: `, proxy);

  return proxy;
};
