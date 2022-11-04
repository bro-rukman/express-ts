import { Request, Response } from 'express';
import IController from './ControllerInterface';
const db = require('../db/models');
class TodoController implements IController {
  getAll = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.app.locals.credential;
    const data = await db.todo.findAll({
      where: { user_id: id },
      attributes: { exclude: ['userId'] },
    });
    return res.status(200).send({
      data,
    });
  };
  create = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.app.locals.credential;
    const { description } = req.body;
    const todo = await db.todo.create({
      user_id: id,
      description,
    });
    return res.status(201).send({
      data: todo,
      message: 'Create todo succeeded !',
    });
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    const { id: user_id } = req.app.locals.credential;
    const { id } = req.params as { id: string };
    const data = await db.todo.findOne({
      where: { id, user_id },
      attributes: { exclude: ['userId'] },
    });
    if (!data) {
      return res.status(404).send({
        message: 'Todo not found !',
      });
    } else {
      return res.status(200).send({
        data,
      });
    }
  };
  updateById = async (req: Request, res: Response): Promise<Response> => {
    const { id: user_id } = req.app.locals.credential;
    const { id } = req.params as { id: string };
    const { description } = req.body;
    await db.todo.update({ description }, { where: { id, user_id } });
    const getDataUpdate = await db.todo.findOne({ where: { id, user_id }, attributes: { exclude: ['userId'] } });
    return res.status(200).send({
      data: getDataUpdate,
      message: 'Update data succeeded !',
    });
  };
  deleteById = async (req: Request, res: Response): Promise<Response> => {
    const { id: user_id } = req.app.locals.credential;
    const { id } = req.params as { id: string };
    const getTodoId = await db.todo.findOne({ where: { id, user_id } });
    if (!getTodoId) {
      return res.status(404).send({ message: 'Data not found !' });
    } else {
      await db.todo.destroy({ where: { id, user_id } });
      return res.status(200).send({ message: 'Data successfully deleted !' });
    }
  };
}
export default new TodoController();
