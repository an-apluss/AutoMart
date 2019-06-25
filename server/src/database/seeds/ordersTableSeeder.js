import database from '../index';

const createOrder = async (buyer, carId, amount, status) => {
  const sqlQuery = `INSERT INTO orders(buyer, car_id, amount, status)
  VALUES($1, $2, $3, $4)`;
  const values = [buyer, carId, amount, status];

  await database
    .query(sqlQuery, values)
    .then(() => {
      console.log('Order successfully created');
    })
    .catch(error => {
      console.log(error);
    });
};

(async () => {
  await createOrder(2, 1, '1750000.00', 'pending');
  await createOrder(2, 3, '1750000.00', 'accepted');
})();
