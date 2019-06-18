import pool from './config';

const dropTables = sqlQuery => {
  pool
    .query(sqlQuery)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(error => {
      console.log(error);
      pool.end();
    });
};

const sqlQuery = 'DROP TABLE IF EXISTS users, cars, orders, flags';
dropTables(sqlQuery);
