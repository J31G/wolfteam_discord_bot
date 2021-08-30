module.exports = {
  slash: false,
  testOnly: true,
  description: 'Unmute a player who has been muted by this bot.',
  aliases: [],
  category: 'General',
  callback: async ({ message, args, client }) => {
    // Check if they are a Game Master
    if (!message.member.roles.cache.find((r) => r.name === 'Game Masters')) {
      const msg = await message.reply('You do not have permission to use this command');
      return setTimeout(() => msg.delete(), 3000);
    }

    // Check if they have included a word
    if (!args[0]) return message.reply('You need to mention a player to unmute');

    try {
      // Find the WT Discord
      const guild = await client.guilds.cache.get('322328346799243264');

      // Find the muted roles
      const mutedRole = await guild.roles.cache.get('436865404233711616');
      const reactionRole = await guild.roles.cache.get('733015356062302327');

      if (!String(args[0]).startsWith('<@') && String(args[0]).endsWith('>')) return message.reply('You have not tagged a valid player');

      // Find the user
      const discordUser = await guild.members.fetch(message.mentions.users.first().id);

      // Now give the user the roles
      discordUser.roles.remove(mutedRole.id);
      discordUser.roles.remove(reactionRole.id);
    } catch (err) { console.error(err); }

    const msg = await message.reply(`Player ${args[0]} has been unmuted`);
    return setTimeout(() => msg.delete(), 3000);
  },
};
