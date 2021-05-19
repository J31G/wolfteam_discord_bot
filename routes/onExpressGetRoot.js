const playerDB = require('../models/player');
require('dotenv').config();

module.exports.onExpressGetRoot = async (req, res) => {
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

  // If correct, find player data from db and send over our page
  const playerData = await playerDB.find();
  return res.render('index', { playerData });
};
