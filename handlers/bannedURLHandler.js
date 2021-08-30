const bannedURL = require('../models/bannedURL');
require('dotenv').config();

// TEMP - Until the code below is used:
// eslint-disable-next-line no-unused-vars
module.exports.bannedURLDetection = async (message, client) => {
  // Get an array of our banned urls from db
  const bannedURLs = await bannedURL.find({}, 'url');

  // if message contains an banned url, do not remove it
  if (!bannedURLs.some((w) => message.content.toLowerCase().includes(w.url))) return;

  message.delete();
  message
    .reply('That URL has been banned on this server. This has been reported.')
    .then((msg) => msg.delete({ timeout: 5000 }));

  /* try {
    // Find the WT Discord
    const guild = await client.guilds.cache.get('322328346799243264');

    // Find the muted roles
    const mutedRole = await guild.roles.cache.get('436865404233711616');
    const reactionRole = await guild.roles.cache.get('733015356062302327');

    // Find the user
    const discordUser = await guild.members.fetch(message.author.id);

    // Now give the user the roles
    discordUser.roles.add(mutedRole.id);
    discordUser.roles.add(reactionRole.id);
  } catch (err) { console.error(err); } */
};
