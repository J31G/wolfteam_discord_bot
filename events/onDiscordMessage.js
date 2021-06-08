const discordTag = require('../models/discordGroupTag');
// const { languageDetection } = require('../handlers/languageDetectionHandler');

module.exports.onDiscordMessage = async (discordClient, message) => {
  // Check if message is from a bot (Important to stop loops)
  if (message.author.bot) return;

  // Language Detection
  // languageDetection(message);

  // Log user if they use the team gamigo tag
  if (message.content.includes('<@&829731272716189746>')) {
    await discordTag.create({
      discord_user_id: message.author.id,
      discord_username: message.author.username,
      discord_message: message.content,
    });
  }
};
