const { Category } = require('../models/category');
const mongoose = require('mongoose');
const { exist } = require('joi');

mongoose.connect('mongodb://localhost/delivery_test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

const categories = [new Category({
    name: "Burritos",
    _id: "5fdfba7589401c2cf40dfde6"
}),
new Category({
    name: "Ensaladas",
    _id: "5fdfba9f89401c2cf40dfde7"
}),
new Category({
    name: "Tacos",
    _id: "5fdfbab389401c2cf40dfde8"
}),
new Category({
    name: "Fajitas",
    _id: "5fdfbac089401c2cf40dfde9"
}),
new Category({
    name: "Enchiladas | Quesadillas | Chimichanga",
    _id: "5fdfbb0089401c2cf40dfdea"
}),
new Category({
    name: "Cocktails",
    _id: "5fdfbb2889401c2cf40dfdeb"
})];

let done = 0;
for (let i = 0; i < categories.length; i++) {
    categories[i].save(function (err, result) {
        done++;
        if (done === categories.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}