module.exports.onDiscordMessage = (discordClient, message) => {
  // Check if message starts with our prefix or is another bot. If so, quit program
  if (
    !message.content.startsWith(process.env.DISCORD_PREFIX) ||
    message.author.bot
  )
    return;

  // Delete message to keep tiny
  message.delete();

  // Split message up into individual words then extract the first as the command
  const args = message.content
    .slice(process.env.DISCORD_PREFIX.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();

  // Check if command was in our command folder. If not, quit program
  if (!discordClient.commands.has(command)) return;

  // If found, move to the command module and report any errors
  try {
    discordClient.commands.get(command).execute(message, args, discordClient);
  } catch (error) {
    console.error(error);
    message.reply("There was an error trying to execute that command!");
  }
};
