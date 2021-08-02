const { MessageEmbed } = require('discord.js');

module.exports = {
  slash: 'both',
  testOnly: true,
  description: 'How to create a ticket and get support on Aeria WolfTeam.',
  expectedArgs: '[language]',
  aliases: ['ticket', 'support'],
  category: 'General',
  callback: async ({ message, client, args }) => {
    // Create an embed to display our language message
    const embed = new MessageEmbed()
      .setFooter(`© BigBOT ${new Date().getFullYear()}`, client.user.avatarURL)
      .setTimestamp();

    if (!args[0] || args[0]?.toLowerCase() === 'en' || args[0].toLowerCase() === 'english') {
      embed
        .setTitle('Submit a ticket')
        .setDescription('Have a problem with WolfTeam and need some help? You\'ll need to create a ticket. To do this, [click here](https://support.gamigo.com/hc/en-us/requests/new?ticket_form_id=360002978513).\n\nPlease fill out all the sections, making a point of selecting the correct category and giving as much detail as possible in the description section. Then keep an eye on your emails.\n\nTickets tend to take around 3 - 5 working days to be answered, but this can vary considerably based on the time of the year, the amount of other tickets before you, and the complexity of your request. This is why it is important to include as much detail as possible.');
    } else if (args[0].toLowerCase() === 'fr' || args[0].toLowerCase() === 'french') {
      embed
        .setTitle('Soumettre un ticket')
        .setDescription('Vous avez un problème avec WolfTeam et avez besoin d\'aide ? Vous devez créer un ticket. Pour ce faire, [cliquez ici](https://support.gamigo.com/hc/fr/requests/new?ticket_form_id=360002978513).\n\nVeuillez remplir toutes les sections, en veillant à sélectionner la bonne catégorie et à donner le plus de détails possible dans la section description. Ensuite, gardez un œil sur vos e-mails.\n\nLe délai de réponse aux billets est généralement de 3 à 5 jours ouvrables, mais il peut varier considérablement en fonction de la période de l\'année, du nombre de billets en attente et de la complexité de votre demande. C\'est pourquoi il est important d\'inclure autant de détails que possible.');
    } else if (args[0].toLowerCase() === 'de' || args[0].toLowerCase() === 'german') {
      embed
        .setTitle('Ein Ticket einreichen')
        .setDescription('Du hast ein Problem mit WolfTeam und brauchst Hilfe? Dann müssen Sie ein Ticket erstellen. Um dies zu tun, [klicken Sie hier](https://support.gamigo.com/hc/de/requests/new?ticket_form_id=360002978513).\n\nBitte füllen Sie alle Felder aus und achten Sie darauf, die richtige Kategorie auszuwählen und die Beschreibung so ausführlich wie möglich zu gestalten. Behalten Sie dann Ihre E-Mails im Auge.\n\nDie Beantwortung von Anfragen dauert in der Regel zwischen 3 und 5 Arbeitstagen, kann aber je nach Jahreszeit, der Anzahl der vor Ihnen liegenden Anfragen und der Komplexität Ihrer Anfrage erheblich variieren. Aus diesem Grund ist es wichtig, dass Sie so viele Details wie möglich angeben.');
    }

    if (message) return message.reply(embed);

    return embed;
  },
};
