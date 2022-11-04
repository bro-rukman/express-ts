import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthenticated !');
  }

  let secretKey = process.env.JWT_SECRET_KEY || 'secret_key';
  const token: string = req.headers.authorization.split(' ')[1];

  try {
    const credential: string | object = jwt.verify(token, secretKey);
    if (credential) {
      req.app.locals.credential = credential;
      return next();
    }
  } catch (error) {
    return res.send(error);
  }
};
