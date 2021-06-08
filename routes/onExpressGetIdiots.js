const discordTag = require('../models/discordGroupTag');
require('dotenv').config();

module.exports.onExpressGetIdiots = async (req, res) => {
  const tagData = await discordTag.find();
  return res.render('idiots', { tagData });
};
