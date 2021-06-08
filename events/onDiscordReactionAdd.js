const voteDB = require('../models/votes');

module.exports.onDiscordReactionAdd = async (reaction, user) => {
  // Let bots do whatever
  if (user.bot) return;

  // If not in our tournament channel, ignore it
  if (reaction.message.channel.id !== '839766277059772446') return;

  reaction.users.remove(user.id);

  const voteFound = await voteDB.exists({ user_id: user.id, message_id: reaction.message.id });

  if (voteFound) return;

  const embedMessage = await reaction.message.channel.messages.fetch(reaction.message.id);
  const playerScore = embedMessage.embeds[0].fields[4].value.split('\n');
  // eslint-disable-next-line no-return-assign, prefer-destructuring
  playerScore.forEach((x, i) => playerScore[i] = x.split(':')[0]);

  await voteDB.create({
    message_id: reaction.message.id,
    user_id: user.id,
    // eslint-disable-next-line no-underscore-dangle
    vote: reaction._emoji.name,
    match: `${playerScore[0]} vs ${playerScore[1]}`,
  });

  const player1Count = await voteDB.countDocuments({ vote: '1️⃣', message_id: reaction.message.id });
  const player2Count = await voteDB.countDocuments({ vote: '2️⃣', message_id: reaction.message.id });

  embedMessage.embeds[0].fields[4].value = `${playerScore[0]}: ${player1Count}\n${playerScore[1]}: ${player2Count}`;
  embedMessage.edit(embedMessage.embeds[0]);
};
