const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const playerDB = require('../models/player');
require('dotenv').config();

module.exports = {
  slash: 'both',
  testOnly: true,
  description: 'Remove yourself from the WolfTeam Alpha V2 Tournament',
  expectedArgs: '<confirm>',
  minArgs: 1,
  maxArgs: 1,
  aliases: ['remove'],
  cooldown: '60s',
  category: 'Tournament',
  callback: async ({
    message, args, interaction, client,
  }) => {
    if (args[0] !== 'confirm') {
      if (message) return message.reply('Invalid syntax, please use `wt.delete confirm`');
      return 'Invalid syntax, please use `wt.delete confirm`';
    }
    // Remove user's message
    if (message) message.delete();

    const discordUserId = interaction ? interaction.member.user.id : message.author.id;
    const userFound = await playerDB.exists({ discord_user_id: discordUserId });

    if (!userFound) {
      if (message) return message.reply('No record was found for this Discord account');
      return 'No record was found for this Discord account';
    }

    try {
    // Remove from our database and off of challonge
      const data = await playerDB.findOneAndDelete({ discord_user_id: discordUserId });
      await axios.delete(`https://api.challonge.com/v1/tournaments/9586434/participants/${data.participant_id}.json?api_key=${process.env.CHALLONGE_API}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    // Remove user tournament role
    const guild = await client.guilds.cache.get('322328346799243264');
    const tournamentRole = await guild.roles.cache.get('839777798884294686');
    const userRole = await guild.members.fetch(discordUserId);
    // eslint-disable-next-line no-console
    userRole.roles.remove(tournamentRole.id).catch(console.error);

    const embed = new MessageEmbed()
      .setTitle('Registration Removed ☹')
      .setDescription('The registration for this discord account has now been removed.')
      .addField('Removed Discord Account', `<@${discordUserId}>`)
      .setFooter(`© BigBOT ${new Date().getFullYear()}`, client.user.avatarURL)
      .setTimestamp();

    if (message) message.reply(embed);
    return embed;
  },
};
