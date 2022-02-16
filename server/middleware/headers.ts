import { exchangeToken } from "../tokenx";
import { NextFunction, Request, Response } from 'express';

export const appendHeaders = async (req: Request, res: Response, next: NextFunction) => {
  const tokenSet = await exchangeToken(req);

  // tslint:disable-next-line:no-console
  console.log('Legg til authorization header: ', tokenSet);

  if (!tokenSet?.expired() && tokenSet?.access_token) {
    req.headers.Authorization = `Bearer ${tokenSet.access_token}`;
  }

  next();
}
