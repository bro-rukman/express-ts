import TodoController from '../controllers/TodoController';
import BaseRouter from './BaseRoutes';
import { auth } from '../middlewares/AuthMiddleware';
import validateTodo from '../middlewares/TodoValidator';

class TodoRouter extends BaseRouter {
  public routes(): void {
    this.router.get('/', auth, TodoController.getAll);
    this.router.post('/create', auth, validateTodo, TodoController.create);
    this.router.get('/:id', auth, TodoController.getById);
    this.router.put('/update/:id', auth, validateTodo, TodoController.updateById);
    this.router.delete('/delete/:id', auth, TodoController.deleteById);
  }
}
export default new TodoRouter().router;
