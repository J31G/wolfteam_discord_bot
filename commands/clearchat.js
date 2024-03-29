module.exports = {
  slash: false,
  testOnly: true,
  description: 'Clear given amount of messages the channel',
  aliases: ['clear'],
  category: 'General',
  callback: async ({ message, args }) => {
    // Remove command
    setTimeout(() => message.delete(), 1000);

    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('You do not have permission to do that').then((msg) => setTimeout(() => msg.delete(), 3000));

    // Get out mentioned user and the amount of messages to delete
    const user = await message.mentions.users.first();
    const amount = parseInt(args[0], 10) ? parseInt(args[0], 10) : parseInt(args[1], 10);

    // Check if amount entered / user tagged
    if (!amount) return message.reply('Must specify an amount to delete!').then((msg) => setTimeout(() => msg.delete(), 3000));
    if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!').then((msg) => setTimeout(() => msg.delete(), 3000));

    // Array to collect message id's to delete
    const messageIDs = [];

    // If a user was tagged, get their messages
    if (user) {
      await message.channel.messages
        .fetch({ limit: 100 })
        .then((msg) => msg.filter((m) => m.author.id === user.id))
        .then((msg) => Array.from(msg).slice(0, amount))
        .then((msg) => msg.forEach((element) => messageIDs.push(element[0])));
    }

    // Now delete the messages
    return message.channel.bulkDelete(!user ? amount : messageIDs, true)
      .then((messages) => message.channel.send(`${messages.size} Messages deleted`))
      .then((msg) => setTimeout(() => msg.delete(), 3000))
      .catch(console.error);
  },
};
