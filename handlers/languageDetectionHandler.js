const DetectLanguage = require('detectlanguage');
const allowedList = require('../models/allowList');
require('dotenv').config();

module.exports.languageDetection = async (message) => {
  // Create a new client to check our messages
  const detectlanguage = new DetectLanguage(process.env.languageAPI);

  try {
    // Detect language from API
    const language = await detectlanguage.detect(message.content);

    // If language is detected and is Turkish
    if (language.length > 0 && language[0].language === 'tr') {
      // Get an array of our allowed words from db
      const allowedWords = await allowedList.find({}, 'word');

      // if message contains an allowed word, do not remove it
      if (allowedWords.some((w) => message.content.toLowerCase().includes(w.word))) return;

      message.delete();
      message
        .reply('not allowed! Turkish is not a supported language for Wolfteam Aeria. Please stick to English, German, or French.\n\nIf you are after the Turkish Discord, you can find it here: <https://joy.ac/WolfteamDiscord>')
        .then((msg) => msg.delete({ timeout: 5000 }));
    }
  } catch (err) { console.error(err); }
};
