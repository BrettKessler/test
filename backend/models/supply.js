const mongoose = require('mongoose');

const supplySchema = mongoose.Schema({
    name: String,
    email: String,
    address1: String,
    address2: String,
    zipCode: Number,
    supplyDescription: String,
    phoneNumber: String,
    suppliesNeeded: String,
    ipAddess: String
});
const collectionName = 'supplies'
module.exports = mongoose.model('Supply', supplySchema, collectionName);