import { Response, Request, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const validate = [
  check('username').isString(),
  check('password').isLength({ min: 10 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    console.log('halo');
    if (!errors.isEmpty) {
      return res.status(422).send({ errors: errors.array() });
    }
    return next();
  },
];
export default validate;
