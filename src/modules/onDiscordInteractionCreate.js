const Discord = require("discord.js");

module.exports.onDiscordInteractionCreate = async (
  discordClient,
  interaction
) => {
  const command = interaction.data.name.toLowerCase();
  const args = interaction.data.options;

  /* eslint-disable no-nested-ternary */
  const user =
    args === undefined
      ? ""
      : args[0].value.match(/^<@!?(\d+)>$/)
      ? `${args[0].value} check out the below: \n\n`
      : "";
  /* eslint-enable no-nested-ternary */

  // Helper function to send API messages
  async function createAPIMessage(message, content) {
    const apiMessage = await Discord.APIMessage.create(
      discordClient.channels.resolve(message.channel_id),
      content
    )
      .resolveData()
      .resolveFiles();

    return { ...apiMessage.data, files: apiMessage.files };
  }

  if (command === "download") {
    const year = new Date();

    const embed = new Discord.MessageEmbed()
      .setColor(3447003)
      .setTitle("Wolfteam Download Links (Mirror)")
      .setDescription(
        `${user}Below you will find the download links for Wolfteam Aeria, to be used if the offical links are not working or are down. Please use at your own risk.`
      )

      /* // Offline Installers */
      .addField("_ _", ":link: Offline Installers")
      .addField(
        ":flag_gb: English",
        "https://cdn.wolfteam.info/wolfteam/en/Wolfteam_EN_Offline_Installer.exe",
        true
      )
      .addField(
        ":flag_de: German",
        "https://cdn.wolfteam.info/wolfteam/de/Wolfteam_DE_Offline_Installer.exe",
        true
      )
      .addField(
        ":flag_fr: French",
        "https://cdn.wolfteam.info/wolfteam/fr/Wolfteam_FR_Offline_Installer.exe",
        true
      )

      .setFooter(`© BigBOT ${year.getFullYear()}`, discordClient.user.avatarURL)
      .setTimestamp();

    discordClient.api
      .interactions(interaction.id, interaction.token)
      .callback.post({
        data: {
          type: 4,
          data: await createAPIMessage(interaction, embed),
        },
      });
  }
};
