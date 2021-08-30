const WOKCommands = require('wokcommands');
const appRoot = require('app-root-path');
require('dotenv').config();

module.exports.onDiscordReady = async (client) => {
  const wokClient = new WOKCommands(client, {
    commandsDir: `${appRoot}/commands`,
    del: 3,
    testServers: ['825352046605238352', '322328346799243264'],
    dbOptions: {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  });
  // Some extra config which I'll move into the json later
  wokClient
    .setDefaultPrefix(process.env.DISCORD_PREFIX)
    .setMongoPath(process.env.MONGO_URI)
    .setBotOwner(['333726780118663178'])
    .setCategorySettings([
      {
        name: 'General',
        emoji: '📜',
      },
      {
        name: 'Fun & Games',
        emoji: '🎮',
      },
      {
        name: 'Tournament',
        emoji: '🐺',
      },
      {
        name: 'Development',
        emoji: '💻',
        hidden: true,
      },
    ]);
};
