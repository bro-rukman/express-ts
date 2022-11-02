import { Request, Response } from 'express';
const db = require('../db/models');
import HashPassword from '../utils/HashPassword';

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body;
    const passwordHashed: string = await HashPassword.hash(password);
    await db.user.create({
      username,
      password: passwordHashed,
    });
    return res.status(200).send('Created user succeeded !');
  };
  login(req: Request, res: Response): Response {
    const { username, password } = req.body;
    if (!username && !password) {
      return res.status(400).send('Wrong username or password !');
    }
    return res.send('Login Succeeded !');
  }
}
export default new AuthController();
