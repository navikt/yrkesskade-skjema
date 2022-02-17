import { ClientRequest, IncomingMessage, ServerResponse } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request } from 'express';
import { exchangeToken } from '../tokenx';

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
    return createProxyMiddleware(path, {
    changeOrigin: true,
    logLevel: process.env.ENV === 'prod' ? 'silent' : 'debug',
    secure: true,
    xfwd: true,
    //onProxyReq: restream,
    onError: errorHandler,
    router: async (req) => {
      const tokenSet = await exchangeToken(req);
      // tslint:disable-next-line:no-console
      console.log('new token: ', tokenSet);

      if (!tokenSet?.expired() && tokenSet?.access_token) {
          // tslint:disable-next-line:no-console
          console.log('add new token bearer');
          req.headers['authorization'] = `Bearer ${tokenSet.access_token}`;
      }
      // tslint:disable-next-line:no-console
      console.log('headers: ', req.headers);

      return undefined;
  },
    target: `${target}`,
  });
};
