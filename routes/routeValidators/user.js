const validator = require('validator');
const isEmpty = require('../../utils/isEmpty');

module.exports = users = {
	validateLogin: data => {
		const errors = {};
		data.emailAddress = !isEmpty(data.emailAddress) ? data.emailAddress : '';
		data.password = !isEmpty(data.password) ? data.password : '';
		if (validator.isEmpty(data.emailAddress)) {
			errors['Email Not Supplied'] = 'emailAddress is a Required Field';
		}
		if (validator.isEmail(data.emailAddress)) {
			errors['Email Not Valid'] = 'emailAddress is invalidly formatted.';
		}
		if (validator.isEmpty(data.password)) {
			errors['Password Not Supplied'] = 'password is a required field.';
		}

		return { errors, isValid: isEmpty(errors) };
	},
	validateCreate: data => {
		const errors = {};
		data.firstName = isEmpty(data.firstName) ? data.firstName : '';
		data.lastName = isEmpty(data.lastName) ? data.lastName : '';
		data.emailAddress = isEmpty(data.emailAddress) ? data.emailAddress : '';
		data.password = isEmpty(data.password) ? data.password : '';
		data.password2 = isEmpty(data.passsword2) ? data.password2 : '';

		if (validator.isEmpty(data.firstName)) {
			errors['First Name Required'] = 'firstName required.';
		}
		if (validator.isEmpty(data.lastName)) {
			errors['Last Name Required'] = 'lastName required.';
		}
		if (validator.isEmpty(data.emailAddress)) {
			errors['Email Address Required'] = 'emailAddress required.';
		}
		if (validator.isEmail(data.emailAddress)) {
			errors['Email Address Invalid'] = 'emailAddress is not valid.';
		}
		if (validator.isEmpty(data.password)) {
			errors['Password Empty'] = 'Password Field is Required';
		}
		if (validator.isLength(data.password, { min: 8 })) {
			errors['Password too Short'] =
				'password must be longer than 8 characters';
		}
		if (validator.isEmpty(data.password2)) {
			errors['Confirm Password Missing'] =
				'confirm password (password2) field is required';
		}
		if (!validator.equals(data.password, data.password2)) {
			errors['Password Mismatch'] = 'passwords do not match';
		}
		return { errors, isValid: isEmpty(errors) };
	},
};
