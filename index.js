const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const categories = require('./routes/categories');
const products = require('./routes/products');
const carts = require('./routes/carts');
const orders = require('./routes/orders');

const app = express();

mongoose.connect('mongodb://localhost/delivery', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 180 * 60 * 1000}
}));
app.use('/delivery/api/categories', categories);
app.use('/delivery/api/products', products);
app.use('/delivery/api/cart', carts)
app.use('/delivery/api/orders', orders);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));