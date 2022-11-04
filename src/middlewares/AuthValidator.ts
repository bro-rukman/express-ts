import { Response, Request, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const validateAuth = [
  check('username').isString(),
  check('password').isLength({ min: 5 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    return next();
  },
];
export default validateAuth;
