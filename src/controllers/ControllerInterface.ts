import { Request, Response } from 'express';

interface IController {
  getAll(req: Request, res: Response): Response;
  create(req: Request, res: Response): Response;
  getById(req: Request, res: Response): Response;
  updateById(req: Request, res: Response): Response;
  deleteById(req: Request, res: Response): Response;
}
export default IController;
