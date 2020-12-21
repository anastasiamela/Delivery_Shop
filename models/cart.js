const Joi = require('joi');
const mongoose = require('mongoose');

class Cart {
    constructor(oldcart) {
        this.items = oldcart.items || [];
        this.totals = oldcart.price || 0; // total price
    }

    inCart(productId) {
        let found = false;
        this.items.forEach(item => {
            if (item._id.toString() === productId.toString()) {
                found = true;
            }
        });
        return found;
    }

    calculateTotals() {
        this.totals = 0;
        this.items.forEach(item => {
            let price = item.price;
            let qty = item.quantity;
            let amount = price * qty;

            this.totals = this.totals + amount;
        });
    }

    addToCart(product, quantity) {
        if (!this.inCart(product.id)) {
            let prod = {
                _id: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity,
            };
            this.items.push(prod);
            this.calculateTotals();
        }
        else {
            for (let i = 0; i < this.items.length; i++) {
                let item = this.items[i];
                if (item._id.toString() === product.id.toString()) {
                    this.items[i].quantity = item.quantity + quantity;
                    break;
                }
            }
            this.calculateTotals();
        }
    }

    updateCartItem(productId, quantity) {
        this.items.forEach(item => {
            if (item._id.toString() === productId.toString()) {
                item.quantity = quantity;
            }
        });
    }

    removeFromCart(productId) {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item._id.toString() === productId.toString()) {
                this.items.splice(i, 1);
                this.calculateTotals();
            }
        }
    }

    emptyCart() {
        this.items = [];
        this.totals = 0;
    }
}

function validateCart(cart) {
    const schema = Joi.object({
      productId: Joi.objectId().required(),
      quantity: Joi.number().min(0).required()
    });
  
    return schema.validate(cart);
  }

exports.Cart = Cart;
exports.validate = validateCart;

