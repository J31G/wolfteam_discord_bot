const DiscordJS = require('discord.js');
const express = require('express');
require('dotenv').config();

// Local Modules
const { onDiscordReady } = require('./events/onDiscordReady');
const { onDiscordMessage } = require('./events/onDiscordMessage');
const { onExpressPostUpdatePlayer } = require('./routes/onExpressPostUpdatePlayer');
const { onExpressGetRoot } = require('./routes/onExpressGetRoot');

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', async (req, res) => onExpressGetRoot(req, res));
app.post('/updatePlayer', async (req, res) => onExpressPostUpdatePlayer(req, res, client));
app.listen(process.env.PORT || 5000);

// Login in our Discord bot
client.login(process.env.DISCORD_TOKEN);
