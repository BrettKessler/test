const mongoose = require('mongoose');

const approvedImageSchema = new mongoose.Schema({
    approvedImage: String
  });

const collectionName = 'approvedimage'
module.exports = mongoose.model('ApprovedImage', approvedImageSchema, collectionName);