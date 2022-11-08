import AuthController from '../controllers/AuthController';
import BaseRouter from './BaseRoutes';
import { auth } from '../middlewares/AuthMiddleware';
import { usersRegisterValidation, usersLoginValidation } from '../schemas/user/user.validation';
class AuthRouter extends BaseRouter {
  public routes(): void {
    this.router.post('/register', usersRegisterValidation, AuthController.register);
    this.router.post('/login', usersLoginValidation, AuthController.login);
    this.router.get('/profile', auth, AuthController.profile);
  }
}
export default new AuthRouter().router;
