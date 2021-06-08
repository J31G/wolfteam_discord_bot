const mongoose = require('mongoose');

const votes = new mongoose.Schema({
  message_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  vote: {
    type: String,
    required: true,
  },
  match: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Votes', votes);
