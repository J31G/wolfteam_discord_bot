const Discord = require('discord.js');
const playerDB = require('../models/player');
const matchDB = require('../models/matches');
require('dotenv').config();

module.exports.onExpressDiscordPost = async (req, res, client) => {
  const player1 = await playerDB.findOne({ participant_id: req.body.player1 });
  const player2 = await playerDB.findOne({ participant_id: req.body.player2 });
  const matchData = await matchDB.findOne({ match_id: req.body.id });
  const year = new Date();

  const embed = new Discord.MessageEmbed()
    .setTitle(`[TEST] Round 1: ${matchData.match_time}`)
    .setDescription(`**Players**\n${player1.ingame_name} (${player1.discord_username}) **vs** ${player2.ingame_name} (${player2.discord_username})`)
    .addField('Map', matchData.map)
    .addField('Room Name', matchData.room_name, true)
    .addField('Room Pass', matchData.room_password, true)
    .setFooter(`© BigBOT ${year.getFullYear()}`, client.user.avatarURL)
    .setTimestamp();

  client.channels.cache.get('843890744548261938').send(embed);

  return res.redirect('/matches');
};
