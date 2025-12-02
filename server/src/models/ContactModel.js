const mongoose = require('mongoose')


const DataSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, trim: true, lowercase: true, required: true},
    subject: {type: String, required: true},
    message: {type: String, required: true}
}, {timestamps: true, versionKey: false})

const ContactModel = mongoose.model('contacts', DataSchema)

module.exports = ContactModel


