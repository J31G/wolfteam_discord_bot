const bannedURL = require('../models/bannedURL');

module.exports = {
  slash: false,
  testOnly: true,
  description: 'Banned a URL on Discord',
  aliases: [],
  category: 'General',
  callback: async ({ message, args, client }) => {
    // Check if game master
    if (!message.member.roles.cache.find((r) => r.name === 'Game Masters')) {
      const msg = await message.reply('You do not have permission to use this command');
      setTimeout(() => msg.delete(), 3000);
      return 'Permission Error';
    }

    // Check if they have included url
    if (!args[0]) return message.reply('Please include a URL');

    // Check if word exists
    if (await bannedURL.exists({ url: args[0].toLowerCase() })) return message.reply(`The URL \`${args[0]}\` already exists, so cannot be added.`);

    await bannedURL.create({
      url: args[0].toLowerCase(),
      added_by: client.user.id,
    });

    return message.reply(`URL **${args[0]}** added`);
  },
};
