import { Request, Response } from 'express';
import { pool } from '../datasources/postgres.datasource';
import { QueryResult } from 'pg';
import Authentication from '../utils/Authentication';
import _ from 'lodash';

class UserController {
  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query(`SELECT "id","username","region","password" FROM users`);
      return res.status(200).json(response.rows);
    } catch (error) {
      return res.status(500).json('Internal Server Error');
    }
  };
  getUserWithTodo = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query(
        `SELECT id,username,region,todo.todo_id,todo.title,todo.description FROM users LEFT JOIN todo ON todo.user_id=id WHERE todo.todo_id IS NOT NULL`
      );
      const groupByUser = _.groupBy(response.rows, 'id');
      console.log(groupByUser);
      return res.status(200).json(response.rows);
    } catch (error) {
      return res.status(500).json('Internal Server Error');
    }
  };
  getById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id, 10);
    const response: QueryResult = await pool.query(
      `SELECT "id","username","region","password" FROM users WHERE id=$1`,
      [id]
    );
    if (response.rowCount === 0) {
      return res.status(404).json({ message: 'User not found !' });
    } else {
      return res.status(200).json(response.rows[0]);
    }
  };
  updateById = async (req: Request, res: Response): Promise<Response> => {
    // const { id } = req.app.locals.credential;
    const id = parseInt(req.params.id, 10);
    const { username, region, password } = req.body;
    const responseGetId: QueryResult = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    if (responseGetId.rowCount !== 0) {
      const passwordHashed: string = await Authentication.passwordHash(password);
      await pool.query(`UPDATE users SET username=$1,region=$2,password=$3 WHERE id=$4`, [
        username,
        region,
        passwordHashed,
        id,
      ]);
      return res.status(200).json({ message: `User ${id} successfully updated !`, data: { id, username, region } });
    } else {
      return res.status(404).json({ message: 'User not found !' });
    }
  };

  deleteById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id, 10);
    const response: QueryResult = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
    if (response.rowCount === 0) {
      return res.status(404).json({ message: 'User not found !' });
    } else {
      return res.status(200).json({ message: `User ${id} successfully deleted !` });
    }
  };
}
export default new UserController();
