const {Cart, validate } = require('../models/cart');
const { Product } = require('../models/product');
const mongoose = require('mongoose');
const express = require('express');
// const session = require('express-session');
const router = express.Router();

router.get('/', async (req, res) => {
  if(!req.session.cart || !req.session.cart.items.length > 0) {
    return res.status(400).send('The cart is empty.');
  }
  let cart = new Cart(req.session.cart);
  cart.calculateTotals();
  res.send(cart);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const qty = req.body.quantity;
  const product = await Product.findById(req.body.productId);
  if (!product) return res.status(400).send('Invalid product.');

  let cart = new Cart(req.session.cart ? req.session.cart : {});

  const prod = {
    id: product._id,
    name: product.name,
    price: product.price,
    quantity: qty,
  };

  if (qty > 0) {
    cart.addToCart(prod, qty);
    req.session.cart = cart;
    res.send(cart);
  } else {
    return res.status(400).send('Invalid quantity.');
  }
});

router.put('/:productId', async (req, res) => {
  const qty = req.body.quantity;
  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(400).send('Invalid product.');

  const cart = new Cart(req.session.cart ? req.session.cart : {});

  if (!cart.inCart(product._id)) return res.status(400).send('This product was not in the cart.');

  if (qty > 0) {
    cart.updateCartItem(product._id, qty);
    req.session.cart = cart;
    res.send(cart);
  } else {
    return res.status(400).send('Invalid quantity.');
  }
});

router.delete('/:productId', async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(400).send('Invalid product.');

  const cart = new Cart(req.session.cart ? req.session.cart : {});

  if (!cart.inCart(product._id)) return res.status(400).send('This product was not in the cart.');

  cart.removeFromCart(product._id);
  req.session.cart = cart;
  res.send(cart);
});

router.delete('/', async (req, res) => {
  const cart = new Cart(req.session.cart ? req.session.cart : {});

  if (!cart.items.length > 0) return res.status(400).send('The cart was empty.');

  cart.emptyCart(req);
  req.session.cart.items = [];
  req.session.cart.totals = 0;
  req.session.cart = cart;
  res.send('The cart is empty now.');
});

module.exports = router; 