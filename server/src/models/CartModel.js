const mongoose = require('mongoose');  

const DataSchema = mongoose.Schema({
    productID: {type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true},
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    quantity: {type: Number, required: true, min: 1},
    price: { type: Number, required: true }
    
}, {timestamps: true, versionKey: false});

const CartModel = mongoose.model('carts', DataSchema);
module.exports = CartModel;