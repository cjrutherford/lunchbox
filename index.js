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
    /**
     * Setup Route Handling...
     */

    app.use('/', (req, res) => {
      res.json({
        message:
          'Sorry, this route is not used. Please check the documentation.',
      });
    });

    app.use('/users', require('./routes').UserRoutes);
    app.use('/address', require('./routes').AddressRoutes);
    app.use('/order', require('./routes').OrderRoutes);

    /**
     * Set Server to listen on port
     */

    app.listen(port, err => {
      if (err) console.error(err);
      console.log(`Server is listening for requests on Port: ${port}`);
    });
  })
  .catch(err => console.error(err));
