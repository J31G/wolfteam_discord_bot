const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  match_id: {
    type: Number,
    required: true,
  },
  room_name: {
    type: String,
    required: true,
  },
  room_password: {
    type: String,
    required: true,
  },
  map: {
    type: String,
    required: true,
  },
  match_time: {
    type: String,
  },
});

module.exports = mongoose.model('Matches', matchSchema);
