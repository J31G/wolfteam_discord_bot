const playerDB = require('../models/player');

module.exports.onExpressGetRoot = async (req, res) => {
  const playerData = await playerDB.find();
  res.render('index', { playerData });
};
