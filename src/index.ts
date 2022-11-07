import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import { config as dotenv } from 'dotenv';
import UserRoutes from './routes/UserRoutes';
import AuthRoutes from './routes/AuthRoutes';
import TodoRoutes from './routes/TodoRoutes';
require('dotenv').config();

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    dotenv();
  }
  protected plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }
  protected routes(): void {
    this.app.route('/').get((req: Request, res: Response) => {
      res.send('This is default path');
    });
    this.app.use('/api/v1/user', UserRoutes);
    this.app.use('/api/v1/auth', AuthRoutes);
    this.app.use('/api/v1/todo', TodoRoutes);
  }
}
const port = process.env.PORT;
const app = new App().app;
app.listen(port, () => {
  console.log('Server running in port ' + port);
});
//to initialize db models
// ./node_modules/.bin/sequelize-cli init
//to create model
// ./node_modules/.bin/sequelize-cli model:generate --name user --attributes username:string,password:string,and so on --underscored
//after create model
// ./node_modules/.bin/sequelize-cli db:migrate
