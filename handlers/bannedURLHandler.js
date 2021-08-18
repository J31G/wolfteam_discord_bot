const bannedURL = require('../models/bannedURL');
require('dotenv').config();

module.exports.bannedURLDetection = async (message) => {
  // Get an array of our banned urls from db
  const bannedURLs = await bannedURL.find({}, 'url');

  // if message contains an banned url, do not remove it
  if (!bannedURLs.some((w) => message.content.toLowerCase().includes(w.url))) return;

  message.delete();
  message
    .reply('That URL has been banned on this server. This has been reported.')
    .then((msg) => msg.delete({ timeout: 5000 }));
};
