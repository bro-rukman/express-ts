import { Request, Response } from 'express';
const db = require('../db/models');
import Authentication from '../utils/Authentication';

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body;
    const passwordHashed: string = await Authentication.passwordHash(password);
    await db.user.create({
      username,
      password: passwordHashed,
    });
    return res.status(200).send('Created user succeeded !');
  };
  login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    const userFind = await db.user.findOne({ where: { username } });
    let result = await Authentication.passwordCompare(password, userFind?.password);
    if (result) {
      let token = Authentication.generateToken(userFind.id, username, password);
      return res.status(200).send({ username, token });
    }
    return res.send('Wrong username or password !');
  };

  profile = (req: Request, res: Response): Response => {
    return res.send(req.app.locals.credential);
  };
}
export default new AuthController();
