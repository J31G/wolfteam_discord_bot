const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  discord_user_id: {
    type: String,
    required: true,
  },
  discord_username: {
    type: String,
    required: true,
  },
  ingame_name: {
    type: String,
    required: true,
  },
  login_name: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  participant_id: {
    type: Number,
    required: true,
  },
  seed: {
    type: Number,
    required: true,
  },
  account: {
    type: String,
  },
  registration_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Player', playerSchema);
