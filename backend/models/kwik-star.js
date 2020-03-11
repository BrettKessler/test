const mongoose = require('mongoose');

const kwikStarSchema = mongoose.Schema({
    description: String,
    summary: String,
    url: String,
    startDate: Date,
    endDate: Date
});
const collectionName = 'kwikstar'
module.exports = mongoose.model('KwikStar', kwikStarSchema, collectionName);