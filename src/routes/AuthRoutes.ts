import AuthController from '../controllers/AuthController';
import BaseRouter from './BaseRoutes';
import validateAuth from '../middlewares/AuthValidator';
import { auth } from '../middlewares/AuthMiddleware';

class AuthRouter extends BaseRouter {
  public routes(): void {
    this.router.post('/register', validateAuth, AuthController.register);
    this.router.post('/login', validateAuth, AuthController.login);
    this.router.get('/profile', auth, AuthController.profile);
  }
}
export default new AuthRouter().router;
