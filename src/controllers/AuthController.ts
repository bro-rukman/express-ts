import { Request, Response } from 'express';
const db = require('../db/models');
import Authentication from '../utils/Authentication';
import { pool } from '../datasources/postgres.datasource';
import { QueryResult } from 'pg';
import createError from 'http-errors';
import bcrypt, { compare } from 'bcrypt';

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
      return res.status(200).json({ message: 'Created user succeeded !', data: response.rows?.[0] });
    }
  };
  login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;
    const users: QueryResult = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    if (users.rows.length === 0) {
      return res.status(401).json({ message: 'Username is incorrect !' });
    } else {
      const compares = await Authentication.passwordCompare(password, users.rows?.[0]?.password);
      if (!compares) {
        return res.status(401).json({ message: 'Incorrect password !' });
      }
      let token = Authentication.generateTokenAndRefresh(users.rows?.[0]?.id, username, users.rows?.[0]?.region);
      res.cookie('refresh_token', token?.refreshToken, { httpOnly: true });
      return res.status(200).send({ username, access_token: token?.accessToken, refresh_token: token?.refreshToken });
    }
  };

  profile = (req: Request, res: Response): Response => {
    const result = req.app.locals.credential;
    return res.status(200).json({ id: result?.id, username: result?.username, region: result?.region });
  };
}
export default new AuthController();
