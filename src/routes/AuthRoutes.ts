
import AuthController from '../controllers/AuthController';
import BaseRouter from './BaseRoutes';

class AuthRouter extends BaseRouter {
  public routes(): void {
    this.router.post('/register', AuthController.register);
    this.router.post('/login', AuthController.login);
  }
}
export default new AuthRouter().router;
