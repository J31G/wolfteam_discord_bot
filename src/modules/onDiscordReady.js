module.exports.onDiscordReady = (discordClient) => {
  console.log("The bot is online");
  discordClient.user
    .setActivity("WolfTeam Discord", { type: "WATCHING" })
    .catch((err) => console.error(err));

  // Create slash command for download
  discordClient.api
    .applications(discordClient.user.id)
    .guilds("322328346799243264")
    .commands.post({
      data: {
        name: "download",
        description: "Download links for WolfTeam AeriaGames",
        options: [
          {
            name: "user",
            description: "Optional user to tag in message",
            type: 3,
            required: false,
          },
        ],
      },
    });
};
