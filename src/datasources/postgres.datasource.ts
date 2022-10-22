import promise from 'bluebird';
import pgPromise from 'pg-promise';
import dotenv from 'dotenv';
import UserRepository from '../repositories/user.repository';

dotenv.config();

const initOptions = {
  promiseLib: promise,
  extend(obj: any, dc: any) {
    obj.users = new UserRepository(obj, pgp);
  },
  query(e: { query: any; cn: any }) {
    // tslint:disable-next-line:no-console
    console.log('CN:', e.query);
    // tslint:disable-next-line:no-console
    console.log('QUERY:', e.query);
  },
};
export const pgp = pgPromise(initOptions);
const port = parseInt(process.env.PGPORT || '5432', 10);
const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port,
};
export const db = pgp(config);
export default { db, pgp };
