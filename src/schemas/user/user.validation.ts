import { user_login, user_register } from './user.schema';
import { Response, Request, NextFunction } from 'express';

export const usersRegisterValidation = async (req: Request, res: Response, next: NextFunction) => {
  const val = await user_register?.validate(req.body);
  if (val.error) {
    return res.status(400).json({
      message: val.error.details[0].message,
    });
  } else {
    next();
  }
};
export const usersLoginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const val = await user_login?.validate(req.body);
  if (val.error) {
    return res.status(400).json({
      message: val.error.details[0].message,
    });
  } else {
    next();
  }
};
