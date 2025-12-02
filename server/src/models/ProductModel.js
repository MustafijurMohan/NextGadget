const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    discount: {type: Number, default: 2 }, // store discount percentage (2%)
    // discountPrice: {type: Number, requried: true}, // final discounted price
    image: {type: Array, required: true},
    remark: {type: String, required: true},
    categoryID: {type: mongoose.Schema.Types.ObjectId},
    brandID: {type: mongoose.Schema.Types.ObjectId}

}, {timestamps: true, versionKey: false})

// Auto-calculate discount price before save
    // DataSchema.pre('save', function(next) {
    //     if(this.price) {
    //         this.discountPrice = this.price - (this.price * (this.discount / 100))
    //     }
    //     next()
    // })


    // Virtual field for discountPrice
DataSchema.virtual('discountPrice').get(function () {
    if (this.price) {
        return this.price - (this.price * (this.discount / 100));
    }
    return this.price;
});

// Ensure virtuals are included in JSON responses
DataSchema.set('toJSON', { virtuals: true });
DataSchema.set('toObject', { virtuals: true });


const ProductModel = mongoose.model('products', DataSchema)
module.exports = ProductModel
