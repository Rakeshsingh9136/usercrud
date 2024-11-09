const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]+$/, // Only alphabets and spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Email validation regex
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // 10-digit phone number
  },
  profileImage: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
