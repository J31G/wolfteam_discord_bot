require('dotenv').config();

module.exports.onExpressGetMessage = async (req, res, client) => {
  const reject = () => {
    res.setHeader('www-authenticate', 'Basic');
    res.sendStatus(401);
  };
  const { authorization } = req.headers;
  if (!authorization) return reject();
  const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString().split(':');

  // Check if basic auth is correct
  if (!(username === process.env.BASIC_AUTH_USERNAME
    && password === process.env.BASIC_AUTH_PASSWORD)) return reject();

  // AUTH SUCCESS BELOW THIS
  const { channels } = await client.guilds.cache.get('322328346799243264');
  const channelsData = [];
  channels.cache.forEach((channel) => {
    if (channel.type === 'GUILD_TEXT') {
      const temp = {
        id: channel.id,
        name: channel.name,
      };
      channelsData.push(temp);
    }
  });
  return res.render('message', { channelsData });
};
