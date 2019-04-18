const validator = require('validator');
const isEmpty = require('../../utils/isEmpty');

module.exports = Items = {
  validateCreate: () => {
    return { errors: '', isValid: true };
  },
};
