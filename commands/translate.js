const { MessageEmbed } = require('discord.js');
const { translate } = require('../handlers/translate');

module.exports = {
  slash: true,
  testOnly: true,
  description: 'Translates a string of text to a give language',
  expectedArgs: '<language> <text>',
  minArgs: 2,
  maxArgs: 2,
  aliases: ['t'],
  category: 'General',
  callback: async ({ args, text }) => {
    const userText = text.substr(args[0].length).trim();
    const data = await translate(userText, args[0]);
    const embed = new MessageEmbed()
      .setTitle(`Translation ${data.detected_source_language} to ${args[0]}`)
      .setDescription(data.text);

    return embed;
  },
};
