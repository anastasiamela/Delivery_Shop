const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  console.log('1');
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  if ("isAdmin" in req.body)
    user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
  else
    user = new User(_.pick(req.body, ['name', 'email', 'password']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.send({"x-auth-token": token});
});

router.get('/', [auth, admin], async (req, res) => {
  const users = await User.find().select('-password').sort('name');
  res.send(users);
});

router.patch('/:id', [validateObjectId, auth, admin], async (req, res) => {
  const { error } = validatePatch(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.params.id,
    {
      isAdmin: req.body.isAdmin
    }, { new: true });

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
});

router.delete('/:id', [validateObjectId, auth, admin], async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
});

function validatePatch(req) {
  const schema = Joi.object({
    isAdmin: Joi.boolean().required()
  });

  return schema.validate(req);
}

module.exports = router; 
