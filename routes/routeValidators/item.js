const validator = require('validator');
const isEmpty = require('../../utils/isEmpty');

module.exports = Items = {
  validateCreate: data => {
    const errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.price = !isEmpty(data.price) ? data.price : '';
    if (validator.isEmpty(data.name)) {
      errors['Name Empty'] = 'name field required';
    }
    if (validator.isEmpty(data.description)) {
      errors['Description Empty'] = 'description is required';
    }
    if (validator.isEmpty(data.price)) {
      errors['Price Empty'] = 'price field is required';
    }
    if (!validator.isNumeric(data.price)) {
      errors['Price invalid'] = 'price field must be numeric';
    }
    return { errors, isValid: isEmpty(errors) };
  },
};
