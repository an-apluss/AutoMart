/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';

chai.should();

chai.use(chaiHttp);

describe('Test Suite For Order Endpoints', () => {
  let buyerSellerToken;

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

  describe('POST /api/v1/order', () => {
    it('should successfully purchase order if provided data are valid', done => {
      chai
        .request(server)
        .post('/api/v1/order')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: 5,
          amount: 1750000
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(201);
          res.body.success.should.be.eql(true);
          res.body.data.should.have.keys(
            'id',
            'car_id',
            'created_on',
            'status',
            'price',
            'price_offered'
          );
          done();
        });
    });
    it('should return error if try to make purchase order on your advert', done => {
      chai
        .request(server)
        .post('/api/v1/order')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: 2,
          amount: 1750000
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if carId is non-numeric', done => {
      chai
        .request(server)
        .post('/api/v1/order')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: 'asjjd1',
          amount: 1750000
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if carId has precision', done => {
      chai
        .request(server)
        .post('/api/v1/order')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: 1.1,
          amount: 1750000
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if carId is empty', done => {
      chai
        .request(server)
        .post('/api/v1/order')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: '',
          amount: 1750000
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if carId is does not exist on the platform', done => {
      chai
        .request(server)
        .post('/api/v1/order')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: 1000000000,
          amount: 1750000
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if amount is non-numeric', done => {
      chai
        .request(server)
        .post('/api/v1/order')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: 5,
          amount: '1.755million'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if amount is empty', done => {
      chai
        .request(server)
        .post('/api/v1/order')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: 1,
          amount: ''
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
  });
  describe('PATCH /api/v1/order/<:orderId>/price', () => {
    it('should successfully update purchase order price if order status is pending and orderId exist', done => {
      chai
        .request(server)
        .patch('/api/v1/order/3/price')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ price: 1755000 })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(202);
          res.body.success.should.be.eql(true);
          res.body.data.should.have.keys(
            'id',
            'car_id',
            'status',
            'old_price_offered',
            'new_price_offered'
          );
          done();
        });
    });
    it('should return error if purchase order status is not pending', done => {
      chai
        .request(server)
        .patch('/api/v1/order/2/price')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ price: 1755000 })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if orderId does not exist', done => {
      chai
        .request(server)
        .patch('/api/v1/order/1000000/price')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ price: 1755000 })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if orderId non-numeric', done => {
      chai
        .request(server)
        .patch('/api/v1/order/number1/price')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ price: 1755000 })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if price is empty', done => {
      chai
        .request(server)
        .patch('/api/v1/order/1/price')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ price: '' })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if price is non-numeric', done => {
      chai
        .request(server)
        .patch('/api/v1/order/1/price')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ price: '1.7m' })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if user try to make update on order that does not belong to them', done => {
      chai
        .request(server)
        .patch('/api/v1/order/1/price')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({ price: 1700000 })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
  });
});
