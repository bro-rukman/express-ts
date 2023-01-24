import UserController from '../controllers/UserController';
import BaseRouter from './BaseRoutes';
import { auth } from '../middlewares/AuthMiddleware';

class UserRouter extends BaseRouter {
  public routes(): void {
    this.router.get('/', UserController.getAll);
    this.router.get('/todo', UserController.getUserWithTodo);
    this.router.get('/:id', UserController.getById);
    this.router.put('/update/:id', UserController.updateById);
    this.router.delete('/delete/:id', UserController.deleteById);
  }
}
export default new UserRouter().router;
