const validator = require('validator');
const isEmpty = require('../../utils/isEmpty');

module.exports = orders = {
  validateCreate: data => {
    const errors = {};
    data.user = !isEmpty(data.user) ? data.user : '';
    data.restaurant = !isEmpty(data.restaurant) ? data.restaurant : '';
    if (validator.isEmpty(data.user)) {
      errors['User Empty'] = 'user field is required';
    }
    if (validator.isEmpty(data.restaurant)) {
      errors['Restaurant Empty'] = 'restaurant field is required';
    }
    return { errors, isValid: isEmpty(errors) };
  },
};
