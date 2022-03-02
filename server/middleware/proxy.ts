import { ClientRequest, IncomingMessage, ServerResponse } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request, Response } from 'express';
import { exchangeToken } from '../tokenx';
import { logError, logInfo, logSecure, stdoutLogger } from '@navikt/yrkesskade-logging';
import jwt_decode from "jwt-decode";
import config from '../config';

const restream = (
  proxyReq: ClientRequest,
  req: IncomingMessage,
  _res: ServerResponse
) => {
  const httpRequest = req as Request;
  const authToken = httpRequest?.cookies && httpRequest?.cookies[config.IDPORTEN_COOKIE_NAME];

  if (checkAuth(authToken)) {
    const requestBody = httpRequest.body;

    Object.keys(req.headers).forEach((key) => {
      proxyReq.setHeader(key, req.headers[key]);
    });

    logInfo('request body: ', requestBody);
    if (requestBody && requestBody.length > 0) {
      const bodyData = JSON.stringify(requestBody);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  } else {
    logError("Unauthorized. Selvbetjening-idtoken invalid");
    (_res as Response).status(401).send("Unauthorized");
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
    logLevel: process.env.ENV === 'prod' ? 'debug' : 'debug',
    secure: true,
    xfwd: true,
    logProvider: () => stdoutLogger,
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

const checkAuth = (authToken): boolean => {
  try {
    jwt_decode(authToken);
    return true;
  } catch (error) {
    return false;
  }
};
