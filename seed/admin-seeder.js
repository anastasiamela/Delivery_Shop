const { User } = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');

mongoose.connect('mongodb://localhost/delivery_shop', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

let user = new User({
    name: "Shop Admin Anastasia",
    email: "shop@gmail.com",
    password: "12345"
});

saveUser(user);

async function saveUser(user) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.save(function (err, result) {
        exit();
    });
}

function exit() {
    mongoose.disconnect();
}