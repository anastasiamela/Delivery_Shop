const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const {Currency, validate, currencySchema} = require('../models/currency');
const mongoose = require('mongoose');
const fixer = require("fixer-api");
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const currencies = await Currency.find().sort('name');
  res.send(currencies);
});

router.post('/', /*[auth, admin],*/ async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let currency = await Currency.findOne({ name: req.body.name });
  if (currency) return res.status(400).send('Currency already exists.');

  currency = new Currency({ name: req.body.name });
  currency = await currency.save();
  
  res.send(currency);
});

router.put('/:id', [auth, admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const currency = await Currency.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!currency) return res.status(404).send('The currency with the given ID was not found.');
  
  res.send(currency);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const currency = await Currency.findByIdAndRemove(req.params.id);

  if (!currency) return res.status(404).send('The currency with the given ID was not found.');

  res.send(currency);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const currency = await Currency.findById(req.params.id);

  if (!currency) return res.status(404).send('The currency with the given ID was not found.');

  const data = await fixer.latest({ base: "EUR", symbols: [currency.name] });

  res.send({
      _id: currency._id,
      name: currency.name,
      rate: data.rates[currency.name]
  });
});

module.exports = router;