const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},

}, {timestamps: true, versionKey: false})

const ProductSliderModel = mongoose.model('productsliders', DataSchema)
module.exports = ProductSliderModel
