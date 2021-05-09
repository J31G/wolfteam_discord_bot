const WOKCommands = require('wokcommands');
require('dotenv').config();

module.exports.onDiscordReady = (client) => {
  const wokClient = new WOKCommands(client, {
    commandsDir: 'commands',
    testServers: ['825352046605238352'],
    dbOptions: {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  });
  wokClient.setDefaultPrefix(process.env.DISCORD_PREFIX);
  wokClient.setMongoPath(process.env.MONGO_URI);
};
