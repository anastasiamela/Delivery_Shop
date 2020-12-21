const Joi = require('joi');
const mongoose = require('mongoose');
const {categorySchema} = require('./category');

const Product = mongoose.model('Product', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  description: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 500
  },
  category: { 
    type: categorySchema,  
    required: true
  },
  numberInStock: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  price: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  }
}));

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).max(500).required(),
    categoryId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    price: Joi.number().min(0).required()
  });

  return schema.validate(product);
}

exports.Product = Product; 
exports.validate = validateProduct;