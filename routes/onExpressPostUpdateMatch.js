// const axios = require('axios');
const matchDB = require('../models/matches');
require('dotenv').config();

module.exports.onExpressPostUpdateMatch = async (req, res) => {
  // If match is edited on the website
  if (req.body.action === 'edit') {
    try {
      await matchDB.findOneAndUpdate({ match_id: req.body.id }, {
        room_name: req.body.roomName,
        room_password: req.body.roomPassword,
        map: req.body.map,
        match_time: req.body.matchTime,
      }, { upsert: true, new: true });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    return res.redirect('/');
  }

  return res.redirect('/');
};
