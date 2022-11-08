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
