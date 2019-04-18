const validator = require('validator');
const isEmpty = require('../../utils/isEmpty');

module.exports = addresses = {
  validateCreate: data => {
    const errors = {};
    data.street = !isEmpty(data.street) ? data.street : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.state = !isEmpty(data.state) ? data.state : '';
    data.zip = !isEmpty(data.zip) ? data.zip : '';
    data.country = !isEmpty(data.country) ? data.country : '';
    if (validator.isEmpty(data.street)) {
      errors['Street Empty'] = 'street field is required';
    }
    if (validator.isEmpty(data.city)) {
      errors['city Empty'] = 'city field is required';
    }
    if (validator.isEmpty(data.state)) {
      errors['state Empty'] = 'state field is required';
    }
    if (validator.isEmpty(data.zip)) {
      errors['zip Empty'] = 'zip field is required';
    }
    if (validator.isEmpty(data.country)) {
      errors['country Empty'] = 'country field is required';
    }
    return { errors, isValid: isEmpty(errors) };
  },
};
