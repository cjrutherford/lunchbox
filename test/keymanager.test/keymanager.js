const should = require('chai').should();
const ensureKeys = require('../../keymanager/manager');
describe('Keymanager', () => {
	describe('#ensureKeys()', () => {
		it('should return a public and private key', done => {
			ensureKeys()
				.then(keys => {
					processResult(keys);
				})
				.catch(err => processResult(err));

			const processResult = res => {
				// res.should.not.be.an('error');
				// res.should.be.an('object');
				res.should.have.property('public'); //.with.typeOf('string');
				res.should.have.property('private'); //.with.typeOf('string');
				done();
			};
		});
	});
});
