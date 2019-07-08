/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';

chai.should();

chai.use(chaiHttp);

describe('Test Suite For Car Endpoints', () => {
  let adminToken;
  let buyerSellerToken;

  before(done => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({ email: 'marvelakinseye@gmail.com', password: 'secret' })
      .end((err, res) => {
        const { token } = res.body.data;
        adminToken = token;
        done();
      });
  });

  before(done => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({ email: 'anuoluwapoakinseye@gmail.com', password: 'secret' })
      .end((err, res) => {
        const { token } = res.body.data;
        buyerSellerToken = token;
        done();
      });
  });

  describe('POST /api/v1/car', () => {
    it('should successfully post car Advert if provided data are valid', done => {
      chai
        .request(server)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .type('form')
        .attach('image', './server/src/tests/lib/fortest.png')
        .field('state', 'used')
        .field('price', 1750000)
        .field('manufacturer', 'bmw')
        .field('model', 'BMW 3 Series 320d 2014')
        .field('bodyType', 'car')
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(201);
          res.body.success.should.be.eql(true);
          res.body.data.should.have.keys(
            'id',
            'email',
            'created_on',
            'manufacturer',
            'model',
            'price',
            'status'
          );
          done();
        });
    });
    it('should return error if image field is empty', done => {
      chai
        .request(server)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .type('form')
        .field('state', 'used')
        .field('price', 1750000)
        .field('manufacturer', 'bmw')
        .field('model', 'BMW 3 Series 320d 2014')
        .field('bodyType', 'car')
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(500);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if image field is not an image format', done => {
      chai
        .request(server)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .attach('image', './server/src/index.js')
        .type('form')
        .field('state', 'used')
        .field('price', 1750000)
        .field('manufacturer', 'bmw')
        .field('model', 'BMW 3 Series 320d 2014')
        .field('bodyType', 'car')
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if provided state field value is empty', done => {
      chai
        .request(server)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .type('form')
        .attach('image', './server/src/tests/lib/fortest.png')
        .field('state', '')
        .field('price', 1750000)
        .field('manufacturer', 'bmw')
        .field('model', 'BMW 3 Series 320d 2014')
        .field('bodyType', 'car')
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided state field value is not string', done => {
      chai
        .request(server)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .type('form')
        .attach('image', './server/src/tests/lib/fortest.png')
        .field('state', 122)
        .field('price', 1750000)
        .field('manufacturer', 'bmw')
        .field('model', 'BMW 3 Series 320d 2014')
        .field('bodyType', 'car')
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided state field value is not new or used', done => {
      chai
        .request(server)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .type('form')
        .attach('image', './server/src/tests/lib/fortest.png')
        .field('state', 'boy')
        .field('price', 1750000)
        .field('manufacturer', 'bmw')
        .field('model', 'BMW 3 Series 320d 2014')
        .field('bodyType', 'car')
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided price field value is empty', done => {
      chai
        .request(server)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .type('form')
        .attach('image', './server/src/tests/lib/fortest.png')
        .field('state', 'used')
        .field('price', '')
        .field('manufacturer', 'bmw')
        .field('model', 'BMW 3 Series 320d 2014')
        .field('bodyType', 'car')
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided price field value is negative number', done => {
      chai
        .request(server)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .type('form')
        .attach('image', './server/src/tests/lib/fortest.png')
        .field('state', 'used')
        .field('price', -173663376)
        .field('manufacturer', 'bmw')
        .field('model', 'BMW 3 Series 320d 2014')
        .field('bodyType', 'car')
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided price field value is not number', done => {
      chai
        .request(server)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .type('form')
        .attach('image', './server/src/tests/lib/fortest.png')
        .field('state', 'used')
        .field('price', 'amount')
        .field('manufacturer', 'bmw')
        .field('model', 'BMW 3 Series 320d 2014')
        .field('bodyType', 'car')
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided manufacturer field value is empty', done => {
      chai
        .request(server)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .type('form')
        .attach('image', './server/src/tests/lib/fortest.png')
        .field('state', 'used')
        .field('price', 1750000)
        .field('manufacturer', '')
        .field('model', 'BMW 3 Series 320d 2014')
        .field('bodyType', 'car')
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.an('string');
          done();
        });
    });
    it('should return error if provided model field value is empty', done => {
      chai
        .request(server)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .type('form')
        .attach('image', './server/src/tests/lib/fortest.png')
        .field('state', 'used')
        .field('price', 1750000)
        .field('manufacturer', 'bmw')
        .field('model', '')
        .field('bodyType', 'car')
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.an('string');
          done();
        });
    });
    it('should return error if provided bodyType field value is empty', done => {
      chai
        .request(server)
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .type('form')
        .attach('image', './server/src/tests/lib/fortest.png')
        .field('state', 'used')
        .field('price', 1750000)
        .field('manufacturer', 'bmw')
        .field('model', 'BMW 3 Series 320d 2014')
        .field('bodyType', '')
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.an('string');
          done();
        });
    });
  });
  describe('PATCH /api/v1/car/:carId/status', () => {
    it('should successfully update car status if provided :carId is number and exist', done => {
      chai
        .request(server)
        .patch('/api/v1/car/4/status')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ status: 'sold' })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(202);
          res.body.success.should.be.eql(true);
          res.body.data.should.have.keys(
            'id',
            'email',
            'created_on',
            'manufacturer',
            'model',
            'price',
            'state',
            'status'
          );
          done();
        });
    });
    it('should return error if user token is admin', done => {
      chai
        .request(server)
        .patch('/api/v1/car/4/status')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'sold' })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(401);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if car advert does not belong to the set token', done => {
      chai
        .request(server)
        .patch('/api/v1/car/5/status')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ status: 'sold' })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(401);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided :carId is non-numeric', done => {
      chai
        .request(server)
        .patch('/api/v1/car/me1/status')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ status: 'sold' })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided :carId does not exist', done => {
      chai
        .request(server)
        .patch('/api/v1/car/1000000/status')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ status: 'sold' })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided value for status is not sold', done => {
      chai
        .request(server)
        .patch('/api/v1/car/4/status')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ status: 'soldme' })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided value for status is empty', done => {
      chai
        .request(server)
        .patch('/api/v1/car/4/status')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ status: '' })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided value for status is special characters', done => {
      chai
        .request(server)
        .patch('/api/v1/car/4/status')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ status: '..!' })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
  });
  describe('PATCH /api/v1/car/:carId/price', () => {
    it('should successfully update car price if provided :carId is number and exist', done => {
      chai
        .request(server)
        .patch('/api/v1/car/4/price')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ price: 1777777 })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(202);
          res.body.success.should.be.eql(true);
          res.body.data.should.have.keys(
            'id',
            'email',
            'created_on',
            'manufacturer',
            'model',
            'price',
            'state',
            'status'
          );
          done();
        });
    });
    it('should return error if provided :carId is non-numeric', done => {
      chai
        .request(server)
        .patch('/api/v1/car/me1/price')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ price: 1777777 })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if car advert does not belong to the set token', done => {
      chai
        .request(server)
        .patch('/api/v1/car/5/price')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ price: 1777777 })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(401);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided :carId does not exist', done => {
      chai
        .request(server)
        .patch('/api/v1/car/1000000/price')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ price: 1777777 })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided value for price is non-numeric', done => {
      chai
        .request(server)
        .patch('/api/v1/car/4/price')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ price: '132emt' })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided value for price is empty', done => {
      chai
        .request(server)
        .patch('/api/v1/car/4/price')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ price: '' })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided value for price is special characters', done => {
      chai
        .request(server)
        .patch('/api/v1/car/4/price')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ price: '..!' })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
  });
  describe('GET /api/v1/car/:carId', () => {
    it('should successfully view a specific car Ad if provided :carId is numeric and exist', done => {
      chai
        .request(server)
        .get('/api/v1/car/1')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'data');
          res.body.status.should.be.eql(200);
          res.body.success.should.be.eql(true);
          res.body.data.should.have.keys(
            'id',
            'owner',
            'created_on',
            'state',
            'status',
            'price',
            'manufacturer',
            'model',
            'body_type'
          );
          done();
        });
    });
    it('should return error if provided :carId is non-numeric', done => {
      chai
        .request(server)
        .get('/api/v1/car/mee1')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided :carId is doesnot exist', done => {
      chai
        .request(server)
        .get('/api/v1/car/1000000')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided :carId is negative numeric', done => {
      chai
        .request(server)
        .get('/api/v1/car/-1')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided :carId is special character', done => {
      chai
        .request(server)
        .get('/api/v1/car/@!')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
  });
  describe('GET /api/v1/car?status=available', () => {
    it('should successfully view all car Ad which status value reads available if exist', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=available')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'data');
          res.body.status.should.be.eql(200);
          res.body.success.should.be.eql(true);
          res.body.data[0].should.have.keys(
            'id',
            'owner',
            'created_on',
            'state',
            'status',
            'price',
            'manufacturer',
            'model',
            'body_type'
          );
          done();
        });
    });
    it('should return message if car status that read available is not on the platform', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=available')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'data');
          res.body.status.should.be.eql(200);
          res.body.success.should.be.eql(true);
          done();
        });
    });
    it('should return error if status is empty', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if status is non-alphabeltic', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=12')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
  });
  describe('GET /api/v1/car?status=available&min_price=XXXValue&max_price=XXXValue', () => {
    it('should successfully view all car Ad which status value reads available between the range of specific prices if exist', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=available&min_price=1700000&max_price=1900000')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'data');
          res.body.status.should.be.eql(200);
          res.body.success.should.be.eql(true);
          res.body.data[0].should.have.keys(
            'id',
            'owner',
            'created_on',
            'state',
            'status',
            'price',
            'manufacturer',
            'model',
            'body_type'
          );
          done();
        });
    });
    it('should return error if provided value for min_price is non-numeric', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=available&min_price=mee1&max_price=1900000')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided value for status is available', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=blue&min_price=mee1&max_price=1900000')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if status is not among the query string ', done => {
      chai
        .request(server)
        .get('/api/v1/car?color=blue&min_price=mee1&max_price=1900000')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided value for min_price is empty', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=available&min_price=&max_price=1900000')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided value for max_price is non-numeric', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=available&min_price=1700000&max_price=mee1')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided value for max_price is empty', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=available&min_price=1700000&max_price=')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided value for min_price and max_price is empty', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=available&min_price=&max_price=')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided value for min_price is greater or equal to max_price', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=available&min_price=1900000&max_price=1700000')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
  });
  describe('DELETE /api/v1/car/carId', () => {
    it('should successfully delete a specific car Ad if carId is numeric and exist', done => {
      chai
        .request(server)
        .delete('/api/v1/car/3')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'data');
          res.body.status.should.be.eql(200);
          res.body.success.should.be.eql(true);
          res.body.data.should.be.eql('Car Ad successfully deleted');
          done();
        });
    });
    it('should return error if header is not set', done => {
      chai
        .request(server)
        .delete('/api/v1/car/3')
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(401);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if provided token is not for admin', done => {
      chai
        .request(server)
        .delete('/api/v1/car/3')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(401);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if carId is non-numeric', done => {
      chai
        .request(server)
        .delete('/api/v1/car/me1')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if carId does not exist', done => {
      chai
        .request(server)
        .delete('/api/v1/car/1000000')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
  });
  describe('GET /api/v1/car', () => {
    it('should view all cars Ad either sold or unsold', done => {
      chai
        .request(server)
        .get('/api/v1/car')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'data');
          res.body.status.should.be.eql(200);
          res.body.success.should.be.eql(true);
          res.body.data[0].should.have.keys(
            'id',
            'owner',
            'created_on',
            'state',
            'status',
            'price',
            'manufacturer',
            'model',
            'body_type'
          );
          done();
        });
    });
    it('should return error if provided token is not for admin', done => {
      chai
        .request(server)
        .get('/api/v1/car')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(401);
          res.body.success.should.be.eql(false);
          done();
        });
    });
  });
  describe('GET /api/v1/car?status=available&state=new', () => {
    it('should view all cars Ad that is unsold and new', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=available&state=new')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'data');
          res.body.status.should.be.eql(200);
          res.body.success.should.be.eql(true);
          res.body.data[0].should.have.keys(
            'id',
            'owner',
            'created_on',
            'state',
            'status',
            'price',
            'manufacturer',
            'model',
            'body_type'
          );
          done();
        });
    });
    it('should error if status is not available', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=randomalphabelt&state=new')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should error if status is not undefined', done => {
      chai
        .request(server)
        .get('/api/v1/car?month=jun&state=new')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should error if state is not new', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=available&state=randomalphabelt')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should error if state is not undefined', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=available&days=monday')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'error');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
  });
  describe('GET /api/v1/car?status=available&state=used', () => {
    it('should view all cars Ad that is unsold and used', done => {
      chai
        .request(server)
        .get('/api/v1/car?status=available&state=used')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .end((er, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'success', 'data');
          res.body.status.should.be.eql(200);
          res.body.success.should.be.eql(true);
          res.body.data[0].should.have.keys(
            'id',
            'owner',
            'created_on',
            'state',
            'status',
            'price',
            'manufacturer',
            'model',
            'body_type'
          );
          done();
        });
    });
  });
});
