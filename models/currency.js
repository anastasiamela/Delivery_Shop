const Joi = require('joi');
const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    length: 3
  }
});

const Currency = mongoose.model('Currency', currencySchema);

function validateCurrency(currency) {
  const schema = Joi.object({
    name: Joi.string().length(3).required()
  });

  return schema.validate(currency);
}

exports.currencySchema = currencySchema;
exports.Currency = Currency;
exports.validate = validateCurrency;