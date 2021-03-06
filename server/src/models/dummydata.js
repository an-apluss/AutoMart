const storage = {
  users: [
    {
      id: 1,
      email: 'anuoluwapoakinseye@gmail.com',
      first_name: 'anuoluwapo',
      last_name: 'akinseye',
      password: '$2b$10$iNkZIHC8.O2.IMttA3scg.ijA2ujMR3NJyM4.Oouo.AE06X0eK3LK',
      address: '25, olaosebikan street, Agbado, Lagos',
      isAdmin: true
    },
    {
      id: 2,
      email: 'taiwoakin@gmail.com',
      first_name: 'taiwo',
      last_name: 'akin',
      password: '$2b$10$iNkZIHC8.O2.IMttA3scg.ijA2ujMR3NJyM4.Oouo.AE06X0eK3LK',
      address: '2, surulere street, Nodopassyourself, Lagos',
      isAdmin: false
    }
  ],
  cars: [
    {
      id: 1,
      owner: 1,
      created_on: '2019/05/25/ 13:30:30',
      state: 'used',
      status: 'available',
      price: '1759999.99',
      manufacturer: 'bwm',
      model: 'BMW 3 Series 320d 2014',
      body_type: 'car',
      imageId: 'showcase',
      imageUrl:
        'https://res.cloudinary.com/an-apluss/image/upload/v1558788050/AutoMart/showcase.jpg'
    },
    {
      id: 2,
      owner: 1,
      created_on: '2019/05/25/ 13:30:30',
      state: 'new',
      status: 'available',
      price: '2000000.00',
      manufacturer: 'bmw',
      model: 'BMW 3 Series 320d 2015',
      body_type: 'car',
      imageId: 'showcase',
      imageUrl:
        'https://res.cloudinary.com/an-apluss/image/upload/v1558788050/AutoMart/showcase.jpg'
    },
    {
      id: 3,
      owner: 1,
      created_on: '2019/05/25/ 13:30:30',
      state: 'new',
      status: 'sold',
      price: '2500000.00',
      manufacturer: 'bmw',
      model: 'BMW 3 Series 320d 2017',
      body_type: 'car',
      imageId: 'showcase',
      imageUrl:
        'https://res.cloudinary.com/an-apluss/image/upload/v1558788050/AutoMart/showcase.jpg'
    },
    {
      id: 4,
      owner: 1,
      created_on: '2019/05/25/ 13:30:30',
      state: 'new',
      status: 'available',
      price: '2500000.00',
      manufacturer: 'bmw',
      model: 'BMW 3 Series 320d 2017',
      body_type: 'car',
      imageId: 'showcase',
      imageUrl:
        'https://res.cloudinary.com/an-apluss/image/upload/v1558788050/AutoMart/showcase.jpg'
    }
  ],
  orders: [
    {
      id: 1,
      buyer: 2,
      car_id: 1,
      created_on: '2019-06-01T22:18:29.600Z',
      amount: '1750000.00',
      status: 'pending'
    },
    {
      id: 2,
      buyer: 2,
      car_id: 3,
      created_on: '2019-06-01T22:18:29.600Z',
      amount: '1750000.00',
      status: 'accepted'
    }
  ],
  flags: [
    {
      id: 1,
      car_id: 2,
      created_on: '2019-06-03T09:40:29.600Z',
      reason: 'pricing',
      description: 'The price is too high'
    }
  ]
};

export default storage;
