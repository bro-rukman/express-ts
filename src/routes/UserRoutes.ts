import { Router, Response, Request } from 'express';
import IRoute from './RouteInterface';
import UserController from '../controllers/UserController';

class UserRouter implements IRoute {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  public routes(): void {
    this.router.get('/', UserController.getAll);
    this.router.post('/create', UserController.create);
    this.router.get('/:id', UserController.getById);
    this.router.put('/update/:id', UserController.updateById);
    this.router.delete('/delete/:id', UserController.deleteById);
  }
}
export default new UserRouter().router;
