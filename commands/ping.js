const { MessageEmbed } = require('discord.js');

module.exports = {
  slash: 'both',
  testOnly: true,
  description: 'A simple ping pong command!',
  aliases: ['p'],
  category: 'Fun & Games',
  callback: ({ message, interaction }) => {
    const embed = new MessageEmbed()
      .setTitle('Ping Command')
      .setDescription('pong!');

    if (message) return message.reply({ embeds: [embed] });
    return interaction.reply({ embeds: [embed] });
  },
};
