import { Response, Request, NextFunction } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  let auth = false;
  if (auth) {
    return next();
  }
  return res.status(401).send('unauthenticated !');
};
