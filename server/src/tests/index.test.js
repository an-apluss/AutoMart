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
          res.body.message.should.be.eql('AutoMart says, Welcome!');
          done();
        });
    });
  });
});
