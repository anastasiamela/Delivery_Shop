const { Order, validate } = require('../models/order');
const { Product } = require('../models/product');
const { Cart } = require('../models/cart');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const session = require('express-session');
// const { Cookie } = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const orders = await Order.find().sort('-date');
    res.send(orders);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (!req.session.cart || !req.session.cart.items.length > 0) {
        return res.status(400).send('The cart is empty.');
    }
    const cart = new Cart(req.session.cart);

    for (let i = 0; i < cart.items.length; i++) {
        let item = cart.items[i];
        const product = await Product.findById(item._id);
        if (!product) return res.status(400).send('Invalid product.');
        if (product.numberInStock - item.quantity < 0) return res.status(400).send('Product not in stock.');
    }

    let order = new Order({
        customerInfo: {
            name: req.body.customerName,
            phone: req.body.customerPhone,
            email: req.body.customerEmail,
            street: req.body.street,
            streetNumber: req.body.streetNumber,
            city: req.body.city,
            zipcode: req.body.zipcode,
            floorNumber: req.body.floorNumber,
            doorbellName: req.body.doorbellName,
        },
        products: cart.items,
        comments: req.body.comments
    });
    // await order.save();
    // req.session.cart = null;
    // res.send(order);
    try {
        console.log('0');
        var task = new Fawn.Task();
        console.log('1');

        task.save('orders', order);
        console.log('2');

        for (let i in order.products) {
            console.log(order.products[i]._id);
            task.update(
                'products', {
                _id: order.products[i]._id
            }, {
                $inc: {
                    numberInStock: - +order.products[i].quantity
                }
            }
            )
        }

        task.run();

        req.session.cart = null;
        res.send(order);
    }
    catch (ex) {
        res.status(500).send('Something failed.');
    }
});

router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).send('The order with the given ID was not found.');

    res.send(order);
});

module.exports = router; 