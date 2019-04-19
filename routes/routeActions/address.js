const promisify = require('util').promisify;

const Models = require('../../models'),
  { Addresses, Users } = Models;

const Validators = require('../routeValidators'),
  { validateCreate } = Validators.Address;

module.exports = Address = {
  addToUser: async (req, res) => {
    const { userId } = req.body;
    const address = req.body;
    delete address.userId;
    const { errors, isValid } = validateCreate(address);
    if (!isValid) res.status(400).json(errors);
    try {
      const newAddress = await new Addresses(address).save();
      const user = await Users.findById(userId);
      user.addresses.push(newAddress._id);
      await user.save();
      res.json({ newAddress, user });
    } catch (e) {
      res.status(500).json(e);
    }
  },
  delete: async (req, res) => {
    const { addressId } = req.params;
    try {
      const user = await Users.findOne({ addresses: addressId });
      user.addresses = user.addresses.filter(x => !x.equals(addressId));
      await user.save();
      const result = await Addresses.findOneAndDelete({ _id: addressId });
      res.json(result);
    } catch (e) {
      res.status(500).json(e);
    }
  },
};
