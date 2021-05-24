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
    .setTitle(`[Alpha V2] Round ${req.body.round}`)
    .setDescription('Below you will find match details for the tournament. Please check these over and let Complain or Big know if any issues.')
    .setColor(3447003)
    .setThumbnail(client.user.avatarURL())
    .addField('Time', matchData.match_time, true)
    .addField('Map', matchData.map, true)
    .addField('Players', `${player1.ingame_name} (<@!${player1.discord_user_id}>)\n**vs**\n ${player2.ingame_name} (<@!${player2.discord_user_id}>)`)
    .addField('Event Account In-Game Names', `${player1.account} **vs** ${player2.account}`)
    .addField('Room Name', matchData.room_name, true)
    .addField('Room Pass', matchData.room_password, true)
    .setFooter(`© BigBOT ${year.getFullYear()}`, client.user.avatarURL())
    .setTimestamp();

  await client.channels.cache.get('843890744548261938')
    .send(embed)
    .then((msg) => {
      msg.react('✅');
      msg.react('❌');
    });

  return res.redirect('/matches');
};
