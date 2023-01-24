import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthenticated !' });
  }

  let secretKey = process.env.ACCESS_SECRET_KEY || 'keys_secrets_access';
  const token: string = req.headers.authorization.split(' ')[1];

  try {
    const credential: string | object = jwt.verify(token, secretKey);
    if (credential) {
      req.app.locals.credential = credential;
      return next();
    }
  } catch (error) {
    return res.status(403).json({ message: 'Invalid Token' });
  }
};
