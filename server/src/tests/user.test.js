/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../index';

chai.should();

chai.use(chaiHttp);

describe('Test Suite For User(sign up and sign in) Endpoints', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('should successfully sign up a user if provided data are valid', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'anuakin@gmail.com',
          firstName: 'anu',
          lastName: 'akin',
          password: 'secret',
          address: '25, olaosebikan street, Agbado, Lagos'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(201);
          res.body.success.should.be.eql(true);
          res.body.data.token.should.be.a('string');
          res.body.data.id.should.be.a('number');
          res.body.data.first_name.should.be.a('string');
          res.body.data.last_name.should.be.a('string');
          res.body.data.email.should.be.a('string');
          done();
        });
    });
    it('should return error if email is invalid', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'anuakin@gmail',
          firstName: 'anu',
          lastName: 'akin',
          password: 'secret',
          address: '25, olaosebikan street, Agbado, Lagos'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if email is empty', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: '',
          firstName: 'anu',
          lastName: 'akin',
          password: 'secret',
          address: '25, olaosebikan street, Agbado, Lagos'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if email already exist', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'anuoluwapoakinseye@gmail.com',
          firstName: 'Anuoluwapo',
          lastName: 'Akinseye',
          password: 'secret',
          address: '25, olaosebikan street, Agbado, Lagos'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(409);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if first_name is empty', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'anuakin@gmail.com',
          firstName: '',
          lastName: 'akin',
          password: 'secret',
          address: '25, olaosebikan street, Agbado, Lagos'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if first_name is non-alphabetic', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'anuakin@gmail.com',
          firstName: 'anu123',
          lastName: 'akin',
          password: 'secret',
          address: '25, olaosebikan street, Agbado, Lagos'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if last_name is non-alphabetic', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'anuakin@gmail.com',
          firstName: 'anu',
          lastName: 'akin123',
          password: 'secret',
          address: '25, olaosebikan street, Agbado, Lagos'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if last_name is empty', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'anuakin@gmail.com',
          firstName: 'anu',
          lastName: '',
          password: 'secret',
          address: '25, olaosebikan street, Agbado, Lagos'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if password is empty', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'anuakin@gmail.com',
          firstName: 'anu',
          lastName: 'akin',
          password: '',
          address: '25, olaosebikan street, Agbado, Lagos'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if password is less than 6 characters', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'anuakin@gmail.com',
          firstName: 'anu',
          lastName: 'akin',
          password: 'secre',
          address: '25, olaosebikan street, Agbado, Lagos'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if address is empty', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'anuakin@gmail.com',
          firstName: 'anu',
          lastName: 'akin',
          password: 'secret',
          address: ''
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if address is not string', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'anuakin@gmail.com',
          firstName: 'anu',
          lastName: 'akin',
          password: 'secret',
          address: 1111
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if address is not string', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'anuakin@gmail.com',
          firstName: 'anu',
          lastName: 'akin',
          password: 'secret',
          address: 1111
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
  });
  describe('POST /api/v1/auth/signin', () => {
    it('should sign in user if login credentials are authentic', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'anuakin@gmail.com',
          password: 'secret'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(200);
          res.body.success.should.be.eql(true);
          res.body.data.token.should.be.a('string');
          res.body.data.id.should.be.a('number');
          res.body.data.first_name.should.be.a('string');
          res.body.data.last_name.should.be.a('string');
          res.body.data.email.should.be.a('string');
          done();
        });
    });
    it('should return error if email is invalid', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'anuakin.com',
          password: 'secret'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if email is empty', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: '',
          password: 'secret'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if password is less than 6 characters', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'anuakin@gmail.com',
          password: 'secre'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if password is empty', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'anuakin.com',
          password: ''
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(422);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if user provide non-existing login credentials', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'anuakin123@gmail.com',
          password: 'secret123'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.status.should.be.eql(401);
          res.body.success.should.be.eql(false);
          res.body.error.should.be.a('string');
          done();
        });
    });
  });
});
