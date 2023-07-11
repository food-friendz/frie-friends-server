const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
 
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = mongoose.model('Restaurant', restaurantSchema);
  