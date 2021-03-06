const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId')
const { Product, validate } = require('../models/product');
const { Category } = require('../models/category');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const categoryId = req.query.categoryId;

  if (typeof categoryId === 'undefined' || categoryId === '') {
    const products = await Product.find().sort('name');
    res.send(products);
  }
  else {
    const { error } = validateParameter({ categoryId: categoryId });
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).send('Invalid category.');

    const products = await Product.find({ "category._id": categoryId }).sort('name');
    res.send(products);
  }
});

router.post('/', [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(error);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send('Invalid category.');

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    category: {
      _id: category._id,
      name: category.name
    },
    numberInStock: req.body.numberInStock,
    price: req.body.price
  });
  await product.save();

  res.send(product);
});

router.put('/:id', [validateObjectId, auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send('Invalid category.');

  const product = await Product.findByIdAndUpdate(req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      category: {
        _id: category._id,
        name: category.name
      },
      numberInStock: req.body.numberInStock,
      price: req.body.price
    }, { new: true });

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

router.delete('/:id', [validateObjectId, auth, admin], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

function validateParameter(req) {
  const schema = Joi.object({
    categoryId: Joi.objectId().required()
  });

  return schema.validate(req);
}

module.exports = router; 