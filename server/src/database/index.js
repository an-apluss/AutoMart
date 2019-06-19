import { Pool } from 'pg';
import 'dotenv/config';

const connectionString = process.env.DB_URL;

const pool = new Pool({ connectionString });

export default {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(text, params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
