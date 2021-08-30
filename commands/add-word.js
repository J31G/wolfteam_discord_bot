const { MessageEmbed } = require('discord.js');
const allowedList = require('../models/allowList');

module.exports = {
  slash: false,
  testOnly: true,
  description: 'Command to add words to the allow list, as to not get flagged by the Turkish language detection.',
  aliases: [],
  category: 'General',
  callback: async ({ message, args, client }) => {
    // Check if they are a Game Master
    if (!message.member.roles.cache.find((r) => r.name === 'Game Masters')) {
      const msg = await message.reply('You do not have permission to use this command');
      setTimeout(() => msg.delete(), 3000);
      return 'Permission Error';
    }
    // Check if they have included a word
    if (!args[0]) return message.reply('Please include a word to add to the allow list.');

    // Check if word exists
    if (await allowedList.exists({ word: args[0].toLowerCase() })) return message.reply(`The word \`${args[0]}\` already exists, so cannot be added.`);

    // Add to DB
    await allowedList.create({
      word: args[0].toLowerCase(),
      added_by: client.user.id,
    });

    // Get words in db
    const allowedWords = await allowedList.find({}, 'word -_id');

    // Create our embed
    const embed = new MessageEmbed()
      .setTitle('Word Added')
      .setDescription(`The word \`${args[0]}\` has been successfully added to the allowed list.`)
      .addField('Allowed Words', allowedWords.map((w) => w.word).join('\n'))
      .setFooter(`© BigBOT ${new Date().getFullYear()}`, client.user.avatarURL)
      .setTimestamp();

    return message.reply({ embeds: [embed] });
  },
};
