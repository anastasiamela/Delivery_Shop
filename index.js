const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const fixer = require("fixer-api");

const categories = require('./routes/categories');
const currencies = require('./routes/currencies');
const products = require('./routes/products');
const carts = require('./routes/carts');
const orders = require('./routes/orders');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/delivery_shop', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

fixer.set({ accessKey: "9edaaf9b21fb2ec431ed3d46bb786c32" });

app.use(express.json());
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use('/delivery/api/categories', categories);
app.use('/delivery/api/currencies', currencies);
app.use('/delivery/api/products', products);
app.use('/delivery/api/cart', carts)
app.use('/delivery/api/orders', orders);
app.use('/delivery/api/users', users);
app.use('/delivery/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));