const mockData = require('./mockData.json');
const should = require('chai').should();
const axios = require('axios');
/**
 * Setting up tests, with other tests.
 */

/**
 * starting with inserting users into the database.
 */

describe('User Insertion', () => {
  mockData.users.forEach(u => {
    describe(`#Create New User ${u.firstName}`, () => {
      it('should return a user object', async done => {
        try {
          const result = await axios.post('http://localhost:3300/user/', u);
          result.should.have.property('addresses').to.be.an('array');
          result.should.have.proptery('createdAt').to.be.a('Date');
          result.should.have.property('isActive').to.be.a('bool');
          result.should.have.property('_id').to.be.a('string');
          result.should.have.property('firstName').to.be.a('string');
          result.should.have.property('lastName').to.be.a('string');
          result.should.have.property('emailAddress').to.be.a('string');
          result.should.have.property('password').to.be.a('string');
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });
});
