import { Response, Request, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const validateTodo = [
  check('description').isString().isLength({ min: 10 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    return next();
  },
];
export default validateTodo;
