const Joi = require('joi');
const mongoose = require('mongoose');

const Order = mongoose.model('Order', new mongoose.Schema({
  customerInfo: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      phone: {
        type: String,
        required: true,
        length: 10,
      },
      email: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      streetNumber: {
        type: Number,
        required: true,
        min: 0,
        max: 255
      },
      city: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      zipcode: {
        type: String,
        required: true,
        trim: true,
        length: 5,
      },
      floorNumber: {
        type: Number,
        required: true,
        min: 0,
        max: 255
      },
      doorbellName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
    }),
    required: true
  },
  products: [{
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
        max: 50
      }
    }),
    required: true
  }],
  comments: {
    type: String,
    //required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  currencyInfo: {
    type: new mongoose.Schema({
      code: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      },
      rate: {
        type: Number,
        required: true,
        min: 0,
      },
    }),
    required: true
  }
}));

function validateOrder(order) {
  const schema = Joi.object({
    customerName: Joi.string().min(5).max(50).required(),
    customerPhone: Joi.string().min(5).max(50).required(),
    customerEmail: Joi.string().min(5).max(255).required().email(),
    street: Joi.string().min(5).max(50).required(),
    streetNumber: Joi.number().min(0).required(),
    city: Joi.string().min(5).max(50).required(),
    zipcode: Joi.string().min(5).max(5).required(),
    floorNumber: Joi.number().min(0).required(),
    doorbellName: Joi.string().min(5).max(50).required(),
    comments: Joi.string().max(500).optional(),
    currencyId: Joi.objectId().required(),
  });

  return schema.validate(order);
}

exports.Order = Order;
exports.validate = validateOrder;