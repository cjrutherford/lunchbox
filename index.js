/**
 * Library Imports.
 * Express - HTTP API Framework
 * Mongoose - ODM for data store: MongoDB
 * Passport - Authentication Wrapper
 */
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

/**
 * Initialize Express Application
 */
const app = express();

/**
 * Import Required Middleware and Environment Variables
 */
const bp = require('body-parser');
const cp = require('cookie-parser');
require('dotenv').config();

/**
 * Set Environment based Constants
 */
const port = process.env.PORT || 3300;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017';

/**
 * Initialize Mongoose, and determine success.
 */
mongoose.set('useCreateIndex', true);
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log(`Successfully connected to MongoDB: ${mongoURI}`);
  })
  .catch(err => {
    console.log(`Error Connecting to MongoDB: ${err}`);
  });
/**
 * set app to use middleware
 */
app.use(passport.initialize()); //injects passport into the middleware stack
app.use(cp()); //allows the parsing of cookies
app.use(bp.urlencoded({ extended: true })); //allows the parsing of url encoded parameters
app.use(bp.json()); //allows the parsing of json bodies.

/**
 * Generate/retrieve keys
 * Initialize passport with strategies and keys
 *
 */
require('./keymanager/manager')()
  .then(keys => {
    //initialize verify mechanism for verification.
    require('./passport/config')(passport, keys.public);

    app.use((req, res, next) => {
      if (req.body) console.log(req.body);
      if (req.params) console.log(req.params);
      if (req.query) console.log(req.query);
      console.log(
        `Received a ${req.method} request from ${req.ip} for ${req.url}`,
      );
      next();
    });
    /**
     * Setup Route Handling...
     */

    // app.use('/', (req, res) => {
    //   res.json({
    //     message:
    //       'Sorry, this route is not used. Please check the documentation.',
    //   });
    // });

    const Routes = require('./routes')(keys.private, passport);
    app.use('/users', Routes.UserRoutes);
    app.use('/address', Routes.AddressRoutes);
    app.use('/order', Routes.OrderRoutes);
    app.use('/item', Routes.ItemRoutes);
    app.use('/restaurant', Routes.RestaurantRoutes);
    app.use('/meta', Routes.MetaRoutes);

    /**
     * Set Server to listen on port
     */

    app.listen(port, err => {
      if (err) console.error(err);
      console.log(`Server is listening for requests on Port: ${port}`);
    });
  })
  .catch(err => console.error(err));
