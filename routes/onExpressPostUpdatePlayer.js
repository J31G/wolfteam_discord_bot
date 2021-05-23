const axios = require('axios');
const playerDB = require('../models/player');
require('dotenv').config();

module.exports.onExpressPostUpdatePlayer = async (req, res) => {
  // If player is edited on the website
  if (req.body.action === 'edit') {
    try {
      // Update details in our database
      await playerDB.findOneAndUpdate({ _id: req.body.id }, {
        discord_user_id: req.body.discordID,
        discord_username: req.body.discordUserName,
        ingame_name: req.body.IGN,
        login_name: req.body.loginName,
        participant_id: req.body.participantID,
        seed: req.body.seed,
        account: req.body.account,
        language: req.body.language,
      }, { upsert: true, useFindAndModify: false });

      // Update player to challonge
      await axios.put(`https://api.challonge.com/v1/tournaments/9586434/participants/${req.body.participantID}.json`, {
        api_key: process.env.CHALLONGE_API,
        participant: {
          name: `${req.body.IGN} (${req.body.discordUserName})`,
          misc: req.body.discordID,
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    return res.redirect('/');
  }

  // If player is deleted on the website
  if (req.body.action === 'delete') {
    try {
      // Remove from our database and off of challonge
      const playerStuff = await playerDB.findOneAndDelete({ _id: req.body.id });

      // Remove player off of challonge
      await axios.delete(`https://api.challonge.com/v1/tournaments/9586434/participants/${playerStuff.participant_id}.json?api_key=${process.env.CHALLONGE_API}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    return res.redirect('/');
  }

  return res.redirect('/');
};
