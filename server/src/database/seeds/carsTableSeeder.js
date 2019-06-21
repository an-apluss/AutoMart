import database from '../index';

const createCar = async (
  owner,
  state,
  price,
  manufacturer,
  model,
  bodyType,
  imageId,
  imageUrl,
  status
) => {
  const sqlQuery = `INSERT INTO cars(owner, state, status, price, manufacturer, model, body_type, imageId, imageUrl) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
  const values = [owner, state, status, price, manufacturer, model, bodyType, imageId, imageUrl];

  await database
    .query(sqlQuery, values)
    .then(() => {
      console.log('Car successfully created');
    })
    .catch(error => {
      console.log(error);
    });
};

(async () => {
  await createCar(
    1,
    'used',
    '1759999.99',
    'bmw',
    'BMW 3 Series 320d 2014',
    'car',
    'showase',
    'https://res.cloudinary.com/an-apluss/image/upload/v1558788050/AutoMart/showcase.jpg',
    'available'
  );
  await createCar(
    1,
    'new',
    '2000000.00',
    'bmw',
    'BMW 3 Series 320d 2014',
    'car',
    'showase',
    'https://res.cloudinary.com/an-apluss/image/upload/v1558788050/AutoMart/showcase.jpg',
    'available'
  );
  await createCar(
    1,
    'new',
    '2500000.00',
    'bmw',
    'BMW 3 Series 320d 2014',
    'car',
    'showase',
    'https://res.cloudinary.com/an-apluss/image/upload/v1558788050/AutoMart/showcase.jpg',
    'sold'
  );
  await createCar(
    1,
    'new',
    '2500000.00',
    'bmw',
    'BMW 3 Series 320d 2014',
    'car',
    'showase',
    'https://res.cloudinary.com/an-apluss/image/upload/v1558788050/AutoMart/showcase.jpg',
    'available'
  );
  await createCar(
    3,
    'used',
    '2500000.00',
    'lexus',
    'RX 330 2016',
    'jeep',
    'showase',
    'https://res.cloudinary.com/an-apluss/image/upload/v1558788050/AutoMart/showcase.jpg',
    'sold'
  );
})();
