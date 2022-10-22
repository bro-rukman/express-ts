import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }
  protected plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(helmet());
  }
  protected routes(): void {
    this.app.route('/').get((req: Request, res: Response) => {
      res.send('Routing use TS');
    });
    this.app.route('/request').post((req: Request, res: Response) => {
      res.send(req.body);
    });
  }
}
const port: number = 8000;
const app = new App().app;
app.listen(port, () => {
  console.log('Server running in port ' + port);
});
