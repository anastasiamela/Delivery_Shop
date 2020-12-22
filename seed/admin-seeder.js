const { User } = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');

mongoose.connect('mongodb://localhost/delivery_test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

let user = new User({
    name: "Shop Admin Anastasia",
    email: "shop@gmail.com",
    password: "12345"
});

generatePassword(user);

user.save(function (err, result) {
    exit();
});

async function generatePassword(user) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
}

function exit() {
    mongoose.disconnect();
}