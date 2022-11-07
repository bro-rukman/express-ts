import promise from 'bluebird';
import pgPromise from 'pg-promise';
import { Pool } from 'pg';
import UserRepository from '../repositories/user.repository';
require('dotenv').config();

const port = parseInt(process.env.PG_PORT || '5432', 10);
export const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port,
});
// const initOptions = {
//   promiseLib: promise,
//   extend(obj: any, dc: any) {
//     obj.users = new UserRepository(obj, pgp);
//   },
//   query(e: { query: any; cn: any }) {
//     // tslint:disable-next-line:no-console
//     console.log('CN:', e.query);
//     // tslint:disable-next-line:no-console
//     console.log('QUERY:', e.query);
//   },
// };
// export const pgp = pgPromise(initOptions);
// const port = parseInt(process.env.PG_PORT || '5432', 10);
// const config = {
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   port,
// };
// export const db = pgp(config);
// export default { db, pgp };
