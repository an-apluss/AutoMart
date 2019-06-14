/* eslint-disable no-console */
import { Pool } from 'pg';
import 'dotenv/config';

const connectionString = process.env.DB_URL;

const pool = new Pool({ connectionString });

pool.on('connect', () => {
  console.log('connected to the db');
});

pool.on('error', error => {
  console.log(error);
});

export default pool;
