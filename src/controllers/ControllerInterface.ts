import { Request, Response } from 'express';

interface IController {
  getAll(req: Request, res: Response): Response | Promise<Response>;
  create(req: Request, res: Response): Response | Promise<Response>;
  getById(req: Request, res: Response): Response | Promise<Response>;
  updateById(req: Request, res: Response): Response | Promise<Response>;
  deleteById(req: Request, res: Response): Response | Promise<Response>;
}
export default IController;
