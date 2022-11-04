import { Request, Response } from 'express';
const db = require('../db/models');
class UserController {
  getAll = async (req: Request, res: Response): Promise<Response> => {
    const allUser = await db.user.findAll({ attributes: { exclude: ['password'] } });
    return res.status(200).send({
      data: allUser,
    });
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params as { id: string };
    const user = await db.user.findOne({ where: { id }, attributes: { exclude: ['password'] } });
    if (!user) {
      return res.status(404).send('User not found !');
    } else {
      return res.status(200).send({ data: user });
    }
  };
  updateById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.app.locals.credential;
    const { username, password } = req.body;
    await db.user.update(
      { username, password },
      { where: { id }, attributes: { exclude: ['password'] } }
    );
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
