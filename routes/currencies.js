const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const { Currency, validate, currencySchema } = require('../models/currency');
const mongoose = require('mongoose');
const fixer = require("fixer-api");
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const view = req.query.view;
  if (typeof view === 'undefined' || view === '') {
    const currencies = await Currency.find().sort('code');
    res.send(currencies);
  }
  else if (view === 'ALL') {
    const data = await fixer.symbols({
      access_key: '9edaaf9b21fb2ec431ed3d46bb786c32'
    });
    res.send(data.symbols);
  }
  else return res.status(400).send('Wrong value for the query parameter view.');

});

router.post('/', [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let currency = await Currency.findOne({ code: req.body.code });
  if (currency) return res.status(400).send('Currency already exists.');

  const data = await fixer.symbols({
    access_key: '9edaaf9b21fb2ec431ed3d46bb786c32'
  });
  if(!data.symbols[req.body.code]) return res.status(400).send('Invalid code.');

  currency = new Currency({ code: req.body.code });
  currency = await currency.save();

  res.send(currency);
});

router.patch('/:id', [validateObjectId, auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let currency = await Currency.findOne({ code: req.body.code });
  if (currency) return res.status(400).send('Currency already exists.');

  const data = await fixer.symbols({
    access_key: '9edaaf9b21fb2ec431ed3d46bb786c32'
  });
  if(!data.symbols[req.body.code]) return res.status(400).send('Invalid code.');

  currency = await Currency.findByIdAndUpdate(req.params.id, { code: req.body.code }, {
    new: true
  });

  if (!currency) return res.status(404).send('The currency with the given ID was not found.');

  res.send(currency);
});

router.delete('/:id', [validateObjectId, auth, admin], async (req, res) => {
  const currency = await Currency.findByIdAndRemove(req.params.id);

  if (!currency) return res.status(404).send('The currency with the given ID was not found.');

  res.send(currency);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const currency = await Currency.findById(req.params.id);

  if (!currency) return res.status(404).send('The currency with the given ID was not found.');

  const data = await fixer.latest({ base: "EUR", symbols: [currency.code] });

  res.send({
    _id: currency._id,
    code: currency.code,
    rate: data.rates[currency.code]
  });
});

module.exports = router;