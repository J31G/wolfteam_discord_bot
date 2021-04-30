const Discord = require("discord.js");

module.exports = {
  name: "link",
  description: "Display the offline downloads for WT",
  execute(message, args, discordClient) {
    const { author } = message;
    const year = new Date();
    const user = args[0] || "";

    // Log who requested the link
    console.log(`Requested Links! ${author.username} (${author.id})`);

    // Create our embed
    const embed = new Discord.MessageEmbed()
      .setColor(3447003)
      .setTitle("Wolfteam Download Links (Mirror)")
      .setDescription(
        "Below you will find the download links for Wolfteam Aeria, to be used if the offical links are not working or are down. Please use at your own risk."
      )

      /* // Web installers
      .addField('_ _', ':link: Web Installers (Only for good/stable internet connections)')
      .addField(':flag_gb: English', `https://cdn.wolfteam.info/wolfteam/en/Wolfteam_EN_Installer.exe`, true)
      .addField(':flag_de: German', `https://cdn.wolfteam.info/wolfteam/de/Wolfteam_DE_Installer.exe`, true)
      .addField(':flag_fr: French', `https://cdn.wolfteam.info/wolfteam/fr/Wolfteam_FR_Installer.exe`, true) */

      /* // Offline Installers */
      .addField("_ _", ":link: Offline Installers")
      .addField(
        ":flag_gb: English",
        `https://cdn.wolfteam.info/wolfteam/en/Wolfteam_EN_Offline_Installer.exe`,
        true
      )
      .addField(
        ":flag_de: German",
        `https://cdn.wolfteam.info/wolfteam/de/Wolfteam_DE_Offline_Installer.exe`,
        true
      )
      .addField(
        ":flag_fr: French",
        `https://cdn.wolfteam.info/wolfteam/fr/Wolfteam_FR_Offline_Installer.exe`,
        true
      )

      /* // Fixes / Patches
      .addField('_ _', ':link: Failed Patch Fix')
      .addField(':flag_gb: English', 'https://www.wolfteam.info/quick_fixes/Launcher_EN.zip', true)
      .addField(':flag_de: German', 'https://www.wolfteam.info/quick_fixes/Launcher_DE.zip', true)
      .addField(':flag_fr: French', 'https://www.wolfteam.info/quick_fixes/Launcher_FR.zip', true)
      .addField(':flag_gb: How to fix it?', 'Download the launcher above for your language. Go to your WT folder and overwrite the launcher.exe with the new one you downloaded')
      .addField(':flag_de: Wie kann man das beheben?', 'Laden Sie den Launcher oben für Ihre Sprache herunter. Gehen Sie zu Ihrem WT-Ordner und überschreiben Sie die Datei launcher.exe mit der neuen, die Sie heruntergeladen haben.')
      .addField(':flag_fr: Comment y remédier ?', 'Téléchargez le lanceur ci-dessus pour votre langue. Allez dans votre dossier WT et remplacez le launcher.exe avec le nouveau que vous avez téléchargé') */

      .setFooter(`© BigBOT ${year.getFullYear()}`, discordClient.user.avatarURL)
      .setTimestamp();

    // Check if args was a tagged user
    const matches = user.match(/^<@!?(\d+)>$/);

    // No vaid user so post normal message
    if (!matches) return message.channel.send({ embed });

    // If user was mentioned, tag them in the message
    return message.channel.send(
      `${discordClient.users.cache.get(matches[1])} check out the below: `,
      { embed }
    );
  },
};
