const mongoose = require('mongoose');  

const DataSchema = mongoose.Schema({
    name: {type: String, required:[ true, "Name is required"]},
    email: {type: String, unique:true, trim: true, lowercase: true, required:[ true, "Email is required"]},
    password: {type: String, required:[ true, "Password is required"]},
    isAdmin: {type: Boolean, default: false},
    image: {type: String, default: ''},
    country: {type: String, default: ''},
    mobile: {type: String, default: ''}
}, {timestamps: true, versionKey: false});

const UserModel = mongoose.model('users', DataSchema);
module.exports = UserModel;