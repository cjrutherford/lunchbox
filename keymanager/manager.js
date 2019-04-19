const fs = require('fs');
const keypair = require('keypair');
const promisify = require('util').promisify;

const mkdir = promisify(fs.mkdir);
const ensureFolder = path => {
	return new Promise((resolve, reject) => {
		mkdir(path)
			.then(() => {
				console.log(`Successfully created ${path}`);
				resolve(null);
			})
			.catch(err => {
				if (err.code === 'EEXIST') {
					console.log(`${path} already exists. Nothing to do`);
					resolve(null);
				}
				console.log(`Error creating ${path}, with ${err}`);
				reject(err);
			});
	});
};

const ensureKeys = () => {
	console.log(__dirname);
	return new Promise((resolve, reject) => {
		ensureFolder('./keys').then(() => {
			try {
				if (
					!fs.existsSync('./keys/private.key') &&
					!fs.existsSync('./keys/public.key')
				) {
					// console.log('Keys do not exist, generating them now.');
					const keys = keypair();
					fs.writeFileSync('./keys/private.key', keys.private);
					fs.writeFileSync('./keys/public.key', keys.public);
					resolve({ private: keys.private, public: keys.public });
				} else {
					// console.log('Keys already exist. Loading Them Now.');
					const pubkey = fs.readFileSync('./keys/public.key', 'utf8');
					const privkey = fs.readFileSync('./keys/private.key', 'utf8');
					resolve({ private: privkey, public: pubkey });
				}
			} catch (err) {
				console.error(err);
				reject(err);
			}
		});
	});
};

module.exports = ensureKeys;
