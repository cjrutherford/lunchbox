const promisify = require('util').promisify;

const Models = require('../../models'),
  { Addresses, Users } = Models;

const Validators = require('../routeValidators'),
  { validateCreate } = Validators.Address;

module.exports = Address = {
  addToUser: async (req, res) => {
    const { userId } = req.params;
    const address = req.body;
    const { errors, isValid } = validateCreate(address);
    if (!isValid) res.status(400).json(errors);
    try {
      const newAddress = await new Addresses(address).save();
      const user = await Users.findById(userId);
      user.addresses.push(newAddress._id);
      await user.save();
      res.json(newAddress, user);
    } catch (e) {
      res.status(500).json(e);
    }
  },
};
