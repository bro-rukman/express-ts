import { Request, Response } from 'express';
const db = require('../db/models');
import Authentication from '../utils/Authentication';
import { pool } from '../datasources/postgres.datasource';
import { QueryResult } from 'pg';

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    let { username, region, password } = req.body;
    const passwordHashed: string = await Authentication.passwordHash(password);
    const response: QueryResult = await pool.query(`INSERT INTO users(username,region,password) VALUES($1,$2,$3)`, [
      username,
      region,
      passwordHashed,
    ]);
    return res.status(200).json({ message: 'Created user succeeded !' });
  };
  login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    const userFind = await db.user.findOne({ where: { username } });
    let result = await Authentication.passwordCompare(password, userFind?.password);
    if (result) {
      let token = Authentication.generateToken(userFind.id, username, password);
      return res.status(200).send({ username, token });
    }
    return res.send('Wrong username or password !');
  };

  profile = (req: Request, res: Response): Response => {
    return res.send(req.app.locals.credential);
  };
}
export default new AuthController();
