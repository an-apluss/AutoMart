/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index';

chai.should();

chai.use(chaiHttp);

describe('Test Suite For Flag Endpoints', () => {
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
  describe('POST /api/v1/flag', () => {
    it('should successfully submit a report if provided data are valid', done => {
      chai
        .request(server)
        .post('/api/v1/flag')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: 4,
          reason: 'pricing',
          description: 'The cost for the car is too high'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(201);
          res.body.success.should.be.eql(true);
          res.body.data.should.have.keys('id', 'car_id', 'reason', 'description');
          done();
        });
    });
    it('should return error if carId does not exist', done => {
      chai
        .request(server)
        .post('/api/v1/flag')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: 1000000,
          reason: 'pricing',
          description: 'The cost for the car is too high'
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
        .post('/api/v1/flag')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: '',
          reason: 'pricing',
          description: 'The cost for the car is too high'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if carId is non-numeric', done => {
      chai
        .request(server)
        .post('/api/v1/flag')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: '1e',
          reason: 'pricing',
          description: 'The cost for the car is too high'
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
        .post('/api/v1/flag')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: '1.1',
          reason: 'pricing',
          description: 'The cost for the car is too high'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if reason value is empty', done => {
      chai
        .request(server)
        .post('/api/v1/flag')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: 4,
          reason: '',
          description: 'The cost for the car is too high'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if reason value is not string', done => {
      chai
        .request(server)
        .post('/api/v1/flag')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: 4,
          reason: 1333333333,
          description: 'The cost for the car is too high'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if description value is empty', done => {
      chai
        .request(server)
        .post('/api/v1/flag')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: 4,
          reason: 'pricing',
          description: ''
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.keys('status', 'error', 'success');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          done();
        });
    });
    it('should return error if description value is not string', done => {
      chai
        .request(server)
        .post('/api/v1/flag')
        .set('Authorization', `Bearer ${buyerSellerToken}`)
        .send({
          carId: 4,
          reason: 'pricing',
          description: 123336666666
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
});
