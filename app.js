const DiscordJS = require('discord.js');
require('dotenv').config();

// Local Modules
const { onDiscordReady } = require('./events/onDiscordReady');
const { onDiscordMessage } = require('./events/onDiscordMessage');

const client = new DiscordJS.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

// Discord Events, found in ./events/*
client.on('ready', () => onDiscordReady(client));
client.on('message', (message) => onDiscordMessage(client, message));

// Login in our Discord bot
client.login(process.env.DISCORD_TOKEN);
