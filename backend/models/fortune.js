const mongoose = require('mongoose');

const fortuneSchema = mongoose.Schema({
    isGardenOpen: String
});
const collectionName = 'fortune'
module.exports = mongoose.model('Fortune', fortuneSchema, collectionName);