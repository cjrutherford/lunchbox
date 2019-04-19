const validator = require('validator');
const isEmpty = require('../../utils/isEmpty');

module.exports = restaurants = {
  validateCreate: data => {
    const errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.geo.lat = !isEmpty(data.geo.lat) ? data.geo.lat : '';
    data.geo.long = !isEmpty(data.geo.long) ? data.geo.long : '';

    if (validator.isEmpty(data.name)) {
      errors['Name Empty'] = 'name field required';
    }
    if (validator.isEmpty(data.description)) {
      errors['Description Empty'] = 'description is required';
    }
    if (validator.isEmpty(data.geo.lat)) {
      errors['Missing Latitude'] = 'geo.lat is required';
    }
    if (validator.isEmpty(data.geo.long)) {
      errors['Missing Longitude'] = 'geo.long is required';
    }
    if (!validator.isNumeric(data.geo.lat)) {
      errors['Latitude invalid'] = 'geo.lat must be a decimal form';
    }
    if (!validator.isNumeric(data.geo.long)) {
      errors['longitude invalid'] = 'geo.long must be a decimal form';
    }

    return { errors, isValid: isEmpty(errors) };
  },
};
