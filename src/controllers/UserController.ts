import { Request, Response } from 'express';
const db = require('../db/models');
import { pool } from '../datasources/postgres.datasource';
import { QueryResult } from 'pg';
class UserController {
  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query(`SELECT "id","username","region","password" FROM users`);
      return res.status(200).json(response.rows);
    } catch (error) {
      return res.status(500).json('Internal Server Error');
    }
  };

  // getAll = async (req: Request, res: Response): Promise<Response> => {
  //   const allUser = await db.user.findAll({ attributes: { exclude: ['password'] } });
  //   return res.status(200).send({
  //     data: allUser,
  //   });
  // };

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
    const { id } = req.app.locals.credential;
    const { username, password } = req.body;
    await db.user.update({ username, password }, { where: { id }, attributes: { exclude: ['password'] } });
    const getDataUpdate = await db.user.findOne({ where: { id }, attributes: { exclude: ['password'] } });
    return res.status(200).send({
      data: getDataUpdate,
      message: 'Success Update user !',
    });
  };

  deleteById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params as { id: string };
    const user = await db.user.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({ message: 'User not found !' });
    }
    await db.user.destroy({ where: { id } });
    return res.status(200).send({ message: 'User successfully deleted !' });
  };
}
export default new UserController();
