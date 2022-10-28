import { Router } from 'express';
import IRoute from './RouteInterface';

abstract class BaseRouter implements IRoute {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  abstract routes(): void;
}
export default BaseRouter;
