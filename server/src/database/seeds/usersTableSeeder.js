import database from '../index';

const createUser = async (email, firstName, lastName, password, address, isAdmin) => {
  const sqlQuery = `INSERT INTO users(email, first_name, last_name, password, address, isAdmin)
  VALUES($1, $2, $3, $4, $5, $6)`;
  const values = [email, firstName, lastName, password, address, isAdmin];

  await database
    .query(sqlQuery, values)
    .then(() => {
      console.log('User successfully created');
    })
    .catch(error => {
      console.log(error);
    });
};

(async () => {
  await createUser(
    'anuoluwapoakinseye@gmail.com',
    'anuoluwapo',
    'akinseye',
    '$2b$10$iNkZIHC8.O2.IMttA3scg.ijA2ujMR3NJyM4.Oouo.AE06X0eK3LK',
    '25, olaosebikan street, Agbado, Lagos',
    false
  );
  await createUser(
    'marvelakinseye@gmail.com',
    'marvel',
    'akinseye',
    '$2b$10$iNkZIHC8.O2.IMttA3scg.ijA2ujMR3NJyM4.Oouo.AE06X0eK3LK',
    '25, Olurnwa street, somewhere, Lagos',
    true
  );
  await createUser(
    'taiwoakin@gmail.com',
    'taiwo',
    'akin',
    '$2b$10$iNkZIHC8.O2.IMttA3scg.ijA2ujMR3NJyM4.Oouo.AE06X0eK3LK',
    '2, surulere street, Nodopassyourself, Lagos',
    false
  );
})();
