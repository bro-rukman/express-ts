import { Request, Response } from 'express';
const db = require('../db/models');
import Authentication from '../utils/Authentication';
import { pool } from '../datasources/postgres.datasource';
import { QueryResult } from 'pg';
import createError from 'http-errors';
import bcrypt from 'bcrypt';

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    let { username, region, password } = req.body;
    const check_username: QueryResult = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    if (check_username.rowCount != 0) {
      return res.status(409).json({ message: `Username ${username} have already in use !` });
    } else {
      const passwordHashed: string = await Authentication.passwordHash(password);
      const response: QueryResult = await pool.query(`INSERT INTO users(username,region,password) VALUES($1,$2,$3)`, [
        username,
        region,
        passwordHashed,
      ]);
      return res.status(200).json({ message: 'Created user succeeded !', data: response.rows[0] });
    }
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
