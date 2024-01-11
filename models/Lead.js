const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  hasLandingPage: {
    type: String,
    required: false,
  }
});
module.exports=mongoose.model('lead',leadSchema)