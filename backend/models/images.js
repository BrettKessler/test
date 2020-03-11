const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    tpImage: {type: String, required: true}
  });

const collectionName = 'images'
module.exports = mongoose.model('Image', imageSchema, collectionName);