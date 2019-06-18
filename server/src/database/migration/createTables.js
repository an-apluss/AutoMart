import pool from './config';

const createTables = sqlQuery => {
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

const sqlQuery = `
    CREATE TABLE users (
      id serial primary key NOT NULL,
      email varchar(128) NOT NULL UNIQUE,
      first_name varchar(128) NOT NULL,
      last_name varchar(128) NOT NULL,
      password varchar(128) NOT NULL,
      address TEXT NOT NULL,
      isAdmin BOOLEAN NOT NULL DEFAULT false
      );
    CREATE TABLE cars (
      id serial primary key NOT NULL,
      created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
      owner integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      state TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'available',
      price NUMERIC(15,2) NOT NULL,
      manufacturer TEXT NOT NULL,
      model TEXT NOT NULL,
      body_type TEXT NOT NULL,
      imageId TEXT NOT NULL,
      imageUrl TEXT NOT NULL
      );
    CREATE TABLE orders (
      id serial primary key NOT NULL,
      buyer integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      car_id integer NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
      created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
      amount NUMERIC(15,2) NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending'
      );
    CREATE TABLE flags (
      id serial primary key NOT NULL,
      car_id integer NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
      created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
      reason TEXT NOT NULL,
      description TEXT NOT NULL
      );
    `;

createTables(sqlQuery);
