/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../index';

chai.should();

chai.use(chaiHttp);

describe('Test Suite For Entry File Endpoints', () => {
  describe('GET /', () => {
    it('should return welcome message if endpoint exist', done => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          res.body.status.should.be.eql(200);
          res.body.data.should.be.eql('AutoMart says, Welcome!');
          done();
        });
    });
    it('should return error if route does not exist', () => {
      chai
        .request(server)
        .get('/api/v1/nonexistingroute')
        .end((err, res) => {
          res.body.status.should.be.eql(404);
          res.body.error.should.be.eql('Route Does not Exist');
        });
    });
  });
});
