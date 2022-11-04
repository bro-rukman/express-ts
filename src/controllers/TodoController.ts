import { Request, Response } from 'express';
import IController from './ControllerInterface';
const db = require('../db/models');
import TodoService from '../services/TodoService';
class TodoController implements IController {
  getAll = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoService = new TodoService(req);
    const data = await service.getAll();
    return res.status(200).send({
      data,
    });
  };
  create = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoService = new TodoService(req);
    const todo = await service.createData();
    return res.status(201).send({
      data: todo,
      message: 'Create todo succeeded !',
    });
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoService = new TodoService(req);
    const data = await service.getDataById();
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
    const service: TodoService = new TodoService(req);
    await service.updateDataById();
    const getDataUpdate = await service.getDataById();
    return res.status(200).send({
      data: getDataUpdate,
      message: 'Update data succeeded !',
    });
  };
  deleteById = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoService = new TodoService(req);
    const getDataId = await service.getDataById();
    if (!getDataId) {
      return res.status(404).send({ message: 'Data not found !' });
    } else {
      await service.deleteDataById();
      return res.status(200).send({ message: 'Data successfully deleted !' });
    }
  };
}
export default new TodoController();
