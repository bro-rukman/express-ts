import { Request } from 'express';
const db = require('../db/models');
class TodoService {
  credential: {
    id: number;
  };
  body: Request['body'];
  params: Request['params'];
  constructor(req: Request) {
    this.credential = req.app.locals.credential;
    this.body = req.body;
    this.params = req.params;
  }

  getAll = async () => {
    const data = await db.todo.findAll({
      where: { user_id: this.credential.id },
      attributes: { exclude: ['userId'] },
    });
    return data;
  };
  createData = async () => {
    const { description } = this.body;
    const data = await db.todo.create({
      user_id: this.credential.id,
      description,
    });
    return data;
  };
  getDataById = async () => {
    const { id } = this.params;
    const data = await db.todo.findOne({
      where: { id, user_id: this.credential.id },
      attributes: { exclude: ['userId'] },
    });
    return data;
  };
  updateDataById = async () => {
    const { id } = this.params;
    const { description } = this.body;
    const data = await db.todo.update({ description }, { where: { id, user_id: this.credential.id } });
    return data;
  };
  deleteDataById = async () => {
    const { id } = this.params;
    const data = await db.todo.destroy({ where: { id, user_id: this.credential.id } });
    return data;
  };
}
export default TodoService;
