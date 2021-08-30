const Discord = require('discord.js');
const { translate } = require('../handlers/translate');
require('dotenv').config();

module.exports.onExpressPostDiscordMessage = async (req, res, client) => {
  const year = new Date();

  const embedEN = new Discord.MessageEmbed()
    .setTitle(req.body.title)
    .setDescription(req.body.text)
    .setFooter(`© BigBOT ${year.getFullYear()}`, client.user.avatarURL)
    .setTimestamp();

  const embedFR = new Discord.MessageEmbed()
    .setTitle((await translate(req.body.title, 'FR')).text)
    .setDescription((await translate(req.body.text, 'FR')).text)
    .setFooter(`© BigBOT ${year.getFullYear()}`, client.user.avatarURL)
    .setTimestamp();

  const embedDE = new Discord.MessageEmbed()
    .setTitle((await translate(req.body.title, 'DE')).text)
    .setDescription((await translate(req.body.text, 'DE')).text)
    .setFooter(`© BigBOT ${year.getFullYear()}`, client.user.avatarURL)
    .setTimestamp();

  try {
    if (req.body?.english) client.channels.cache.get(req.body.channel).send({ embeds: [embedEN] });
    if (req.body?.french) client.channels.cache.get(req.body.channel).send({ embeds: [embedFR] });
    if (req.body?.german) client.channels.cache.get(req.body.channel).send({ embeds: [embedDE] });
  } catch (err) {
    console.error(err);
  }

  return res.redirect('/message');
};
