const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const playerDB = require('../models/player');
require('dotenv').config();

module.exports = {
  slash: 'both',
  testOnly: true,
  description: 'Registrieren Sie sich für das WolfTeam Alpha V2-Turnier',
  expectedArgs: '<in-game name> <benutzername>',
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
        .setTitle('Fehler bei doppeltem Konto')
        .setDescription('Der Discord-Account, der gerade versucht hat, sich zu bewerben, ist bereits für die Teilnahme an diesem Turnier registriert.\n\nWenn Sie entweder nicht mehr teilnehmen möchten oder einen Fehler gemacht haben und sich mit den richtigen Angaben erneut bewerben möchten, verwenden Sie bitte `wt.delete confirm`')
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
        misc: 'discordUserId',
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
      language: 'DE',
    });

    // Give user tournament role
    const server = await client.guilds.cache.get(interaction
      ? interaction.guild_id : message.channel.guild.id);
    const tournamentRole = await server.roles.cache.find((role) => role.name === 'Tournament participant');
    // eslint-disable-next-line no-console
    server.members.cache.get(discordUserId).roles.add(tournamentRole.id).catch(console.error);

    // Create a discord embed message
    const embed = new MessageEmbed()
      .setTitle('Turnier-Anmeldung')
      .setDescription('Vielen Dank, Ihre Registrierung war erfolgreich.')
      .addField('Discord Name', `<@${discordUserId}>`)
      .addField('In-game Name', args[0])
      .addField('Language', 'Deutsch')
      .setFooter(`© BigBOT ${new Date().getFullYear()}`, client.user.avatarURL)
      .setTimestamp();

    // Post it in Discord
    if (message) message.reply(embed);
    return embed;
  },
};
