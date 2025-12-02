const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    // multiple products in one order
    products: [
        {
            productID: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true } // snapshot of product price
        }
    ],
    // structured address info
    address: {
        name: {type: String, required: true},
        email: {type: String, trim: true, lowercase: true, required: true},
        street: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        zip: {type: Number, required: true},
        country: {type: String, required: true},
        phone: {type: Number, required: true}
    },

     // order summary
    subTotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    
    // order status
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },

      // payment info
    paymentMethod: { type: String, required: true },
    paymentInfo: {
        transactionId: String,
        paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' }
    },

}, { timestamps: true, versionKey: false})


const OrderModel = mongoose.model('orders', DataSchema)
module.exports = OrderModel


