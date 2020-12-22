const { User } = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');

mongoose.connect('mongodb://localhost/delivery_shop', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

let users = [new User({
    name: "Shop Admin Anastasia",
    email: "shop@gmail.com",
    password: "12345",
    isAdmin: true
}),
new User({
    name: "Client Anastasia",
    email: "anastasia@gmail.com",
    password: "12345",
    isAdmin: false
})];

saveUsers(users);

async function saveUsers(users) {
    for (let i = 0; i < users.length; i++) {
        const salt = await bcrypt.genSalt(10);
        users[i].password = await bcrypt.hash(users[i].password, salt);
        await users[i].save();
    }
    exit();
}

function exit() {
    mongoose.disconnect();
}