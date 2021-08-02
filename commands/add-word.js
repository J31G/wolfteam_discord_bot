const { MessageEmbed } = require('discord.js');
const allowedList = require('../models/allowList');

module.exports = {
  slash: false,
  testOnly: true,
  description: 'Command to add words to the allow list, as to not get flagged by the Turkish language detection.',
  aliases: [],
  category: 'General',
  callback: async ({ message, args, client }) => {
    const embed = new MessageEmbed()
      .setTitle('Word Added')
      .setDescription(`The word **${args[0]}** has been successfully added to the allowed list.`)
      .setFooter(`© BigBOT ${new Date().getFullYear()}`, client.user.avatarURL)
      .setTimestamp();

    await allowedList.create({
      word: args[0],
      added_by: client.user.id,
    });

    if (message) return message.reply(embed);

    return embed;
  },
};
