import { user_login, user_register } from './user.schema';
import { Response, Request, NextFunction } from 'express';

export const usersRegisterValidation = async (req: Request, res: Response, next: NextFunction) => {
  const val = await user_register?.validate(req.body);
  console.log(val.error);
  if (val.error) {
    const splitMessage = val.error?.details?.[0].message.split('"');
    return res.status(400).json({
      message: splitMessage[1],
    });
  } else {
    next();
  }
};
export const usersLoginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const val = await user_login?.validate(req.body);
  if (val.error) {
    const splitMessage = val.error?.details?.[0].message.split('"');
    return res.status(400).json({
      message: splitMessage[1],
    });
  } else {
    next();
  }
};
