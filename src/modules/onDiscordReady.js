module.exports.onDiscordReady = (discordClient) => {
  console.log("The bot is online");
  discordClient.user
    .setActivity("WolfTeam Discord", { type: "WATCHING" })
    .catch((err) => console.error(err));
};
