const { Currency } = require('../models/currency');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/delivery_shop', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

const currencies = [new Currency({
    code: "EUR",
}),
new Currency({
    code: "USD",
}),
new Currency({
    code: "GBT",
})];

let done = 0;
for (let i = 0; i < currencies.length; i++) {
    currencies[i].save(function (err, result) {
        done++;
        if (done === currencies.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}