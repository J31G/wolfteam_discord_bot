const DiscordJS = require('discord.js');
const express = require('express');
require('dotenv').config();

// Local Modules
const { onDiscordReady } = require('./events/onDiscordReady');
const { onDiscordMessage } = require('./events/onDiscordMessage');
const { onDiscordReactionAdd } = require('./events/onDiscordReactionAdd');
const { onExpressPostUpdatePlayer } = require('./routes/onExpressPostUpdatePlayer');
const { onExpressPostUpdateMatch } = require('./routes/onExpressPostUpdateMatch');
const { onExpressDiscordPost } = require('./routes/onExpressPostDiscordPost');
const { onExpressPostDiscordVote } = require('./routes/onExpressPostDiscordVote');
const { onExpressPostDiscordMessage } = require('./routes/onExpressPostDiscordMessage');
const { onExpressGetRoot } = require('./routes/onExpressGetRoot');
const { onExpressGetMatches } = require('./routes/onExpressGetMatches');
const { onExpressGetMessage } = require('./routes/onExpressGetMessage');

// Discord Client
const client = new DiscordJS.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  ws: { intents: DiscordJS.Intents.PRIVILEDGED },
});

// Discord Events, found in ./events/*
client.on('ready', () => onDiscordReady(client));
client.on('message', (message) => onDiscordMessage(client, message));
client.on('messageReactionAdd', (messageReaction, user) => onDiscordReactionAdd(messageReaction, user));

// Express Setup
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express routes found in ./routes/*
app.get('/', async (req, res) => onExpressGetRoot(req, res));
app.get('/matches', async (req, res) => onExpressGetMatches(req, res));
app.get('/message', async (req, res) => onExpressGetMessage(req, res, client));
app.post('/updatePlayer', async (req, res) => onExpressPostUpdatePlayer(req, res, client));
app.post('/updateMatch', async (req, res) => onExpressPostUpdateMatch(req, res, client));
app.post('/discordUpdate', async (req, res) => onExpressDiscordPost(req, res, client));
app.post('/discordUpdateVote', async (req, res) => onExpressPostDiscordVote(req, res, client));
app.post('/discordMessage', async (req, res) => onExpressPostDiscordMessage(req, res, client));

// HTTP port for our express app
app.listen(process.env.PORT || 5000);

// Login in our Discord bot
client.login(process.env.DISCORD_TOKEN);
