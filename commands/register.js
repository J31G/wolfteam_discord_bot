const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const playerDB = require('../models/player');
require('dotenv').config();

module.exports = {
  // slash: 'both',
  slash: false,
  testOnly: true,
  description: 'Register for the WolfTeam Alpha V2 Tournament',
  expectedArgs: '<in-game name> <login name>',
  minArgs: 2,
  maxArgs: 2,
  aliases: ['registration', 'reg'],
  category: 'Tournament',
  cooldown: '60s',
  callback: async ({
    message, args, interaction, client,
  }) => {
    const discordUserId = interaction ? interaction.member.user.id : message.author.id;
    const discordUsername = interaction
      ? interaction.member.user.username : message.author.username;
    const userFound = await playerDB.exists({ discord_user_id: discordUserId });

    if (userFound) {
      const errorEmbed = new MessageEmbed()
        .setTitle('Duplicate Account Error')
        .setDescription('The Discord account that has just tried to apply is already registered to take part in this tournament.\n\nIf you either no longer wish to take part or have made a mistake and want to apply again with the correct details, please use `wt.delete confirm`')
        .setFooter(`© BigBOT ${new Date().getFullYear()}`, client.user.avatarURL)
        .setTimestamp();

      if (message) return message.reply(errorEmbed);
      return errorEmbed;
    }

    // Upload player to challonge
    const challongeData = await axios.post('https://api.challonge.com/v1/tournaments/9586434/participants.json', {
      api_key: process.env.CHALLONGE_API,
      participant: {
        name: `${args[0]} (${discordUsername})`,
        misc: discordUserId,
      },
    });

    // Upload to our database
    await playerDB.create({
      discord_user_id: discordUserId,
      discord_username: discordUsername,
      ingame_name: args[0],
      login_name: args[1],
      participant_id: challongeData.data.participant.id,
      seed: challongeData.data.participant.seed,
      language: 'EN',
    });

    try {
      // Give user tournament role
      const guild = await client.guilds.cache.get('322328346799243264');
      const tournamentRole = await guild.roles.cache.get('839777798884294686');
      const userRole = await guild.members.fetch(discordUserId);
      userRole.roles.add(tournamentRole.id);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    // Create a discord embed message
    const embed = new MessageEmbed()
      .setTitle('Tournament registration')
      .setDescription('Thank you, your registration has been successful.')
      .addField('Discord Name', `<@${discordUserId}>`)
      .addField('In-game Name', args[0])
      .addField('Language', 'English')
      .setFooter(`© BigBOT ${new Date().getFullYear()}`, client.user.avatarURL)
      .setTimestamp();

    // Post it in Discord
    if (message) message.reply(embed);
    return embed;
  },
};
