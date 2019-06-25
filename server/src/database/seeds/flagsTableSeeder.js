import database from '../index';

const createFlag = async (carId, reason, description) => {
  const sqlQuery = `INSERT INTO flags(car_id, reason, description)
  VALUES($1, $2, $3)`;
  const values = [carId, reason, description];

  await database
    .query(sqlQuery, values)
    .then(() => {
      console.log('Flag successfully submitted');
    })
    .catch(error => {
      console.log(error);
    });
};

(async () => {
  await createFlag(2, 'pricing', 'The price is too high');
})();
