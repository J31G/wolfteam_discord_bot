// const { languageDetection } = require('../handlers/languageDetectionHandler');

module.exports.onDiscordMessage = (discordClient, message) => {
  // Check if message is from a bot (Important to stop loops)
  if (message.author.bot) return;

  // Language Detection
  // languageDetection(message);
};
