const DiscordJS = require('discord.js');
const express = require('express');
require('dotenv').config();

// Local Modules
const { onDiscordReady } = require('./events/onDiscordReady');
const { onDiscordMessage } = require('./events/onDiscordMessage');
const playerDB = require('./models/player');

// Discord Client
const client = new DiscordJS.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

// Discord Events, found in ./events/*
client.on('ready', () => onDiscordReady(client));
client.on('message', (message) => onDiscordMessage(client, message));

// Express Setup
const app = express();
app.set('view engine', 'ejs');
app.get('/', async (req, res) => {
  const playerData = await playerDB.find();
  res.render('index', { playerData });
});
app.listen(process.env.PORT || 5000);

// Login in our Discord bot
client.login(process.env.DISCORD_TOKEN);
