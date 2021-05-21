const axios = require('axios');
const playerDB = require('../models/player');
const matchDB = require('../models/matches');
require('dotenv').config();

module.exports.onExpressGetMatches = async (req, res) => {
  const reject = () => {
    res.setHeader('www-authenticate', 'Basic');
    res.sendStatus(401);
  };
  const { authorization } = req.headers;
  if (!authorization) return reject();
  const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString().split(':');

  // Check if basic auth is correct
  if (!(username === process.env.BASIC_AUTH_USERNAME
    && password === process.env.BASIC_AUTH_PASSWORD)) return reject();

  // AUTH SUCCESS BELOW THIS
  const playerData = await playerDB.find();
  const matchDBData = await matchDB.find();
  const { data: matchData } = await axios.get(`https://api.challonge.com/v1/tournaments/9586434/matches.json?api_key=${process.env.CHALLONGE_API}`);
  return res.render('matches', { matchData, playerData, matchDBData });
};
