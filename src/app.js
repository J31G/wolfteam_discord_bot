const Discord = require("discord.js");
const fs = require("fs");
require("dotenv").config();

// Local Modules
const { onDiscordReady } = require("./modules/onDiscordReady");
const { onDiscordMessage } = require("./modules/onDiscordMessage");

// Discord setup
const discordClient = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
discordClient.commands = new Discord.Collection();

// Check for commands in our commands folder
const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));

// For each command found, register it as a command
commandFiles.forEach((file) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const command = require(`./commands/${file}`);
  discordClient.commands.set(command.name, command);
});

// On "ready" handler "./modules/onDiscordReady"
discordClient.once("ready", () => onDiscordReady(discordClient));

// On "message" handler "./modules/onDiscordMessage"
discordClient.on("message", (message) =>
  onDiscordMessage(discordClient, message)
);

// Log bot in using the token
discordClient.login(process.env.DISCORD_TOKEN);
