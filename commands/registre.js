const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const playerDB = require('../models/player');
require('dotenv').config();

module.exports = {
  slash: 'both',
  testOnly: true,
  description: 'Inscrivez-vous au tournoi WolfTeam Alpha V2',
  expectedArgs: '<nom de jeu> <nom de login>',
  minArgs: 2,
  maxArgs: 2,
  aliases: [],
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
        .setTitle('Erreur de duplication de compte')
        .setDescription("Le compte Discord qui vient d'essayer de s'inscrire est déjà enregistré pour participer à ce tournoi.\n\nSi vous ne souhaitez plus participer ou si vous avez fait une erreur et que vous souhaitez vous réinscrire avec des informations correctes, veuillez utiliser la fonction `wt.delete confirm`.")
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
      language: 'FR',
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
      .setTitle('Inscription au tournoi')
      .setDescription('Merci, votre inscription a été acceptée.')
      .addField('Discord Name', `<@${discordUserId}>`)
      .addField('In-game Name', args[0])
      .addField('Language', 'Français')
      .setFooter(`© BigBOT ${new Date().getFullYear()}`, client.user.avatarURL)
      .setTimestamp();

    // Post it in Discord
    if (message) message.reply(embed);
    return embed;
  },
};
