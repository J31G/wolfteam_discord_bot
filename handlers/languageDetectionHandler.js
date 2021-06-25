const DetectLanguage = require('detectlanguage');
const fs = require('fs');
require('dotenv').config();

module.exports.languageDetection = async (message) => {
  // Create a new client to check our messages
  const detectlanguage = new DetectLanguage(process.env.languageAPI);

  try {
    // Detect language from API
    const language = await detectlanguage.detect(message.content);

    // If language is detected and is Turkish
    if (language.length > 0 && language[0].language === 'tr') {
      // Load our allowed words from file
      const allowedList = fs
        .readFileSync('./files/allowed_list.txt', 'utf8')
        .split('\n');

      // if message contains an allowed word, do not remove it
      if (allowedList.some((v) => message.content.toLowerCase().includes(v))) return;

      message.delete();
      message
        .reply('not allowed! Turkish is not a supported language for Wolfteam Aeria. Please stick to English, German, or French.')
        .then((msg) => msg.delete({ timeout: 5000 }));
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};
