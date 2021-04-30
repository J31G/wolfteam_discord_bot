const DetectLanguage = require("detectlanguage");
const fs = require("fs");
require("dotenv").config();

module.exports.languageDetection = async (message) => {
  // Create a new client to check our messages
  const detectlanguage = new DetectLanguage(process.env.languageAPI);

  try {
    // Detect language from API
    const language = await detectlanguage.detect(message.content);

    // If language is detected and is Trukish
    if (language.length > 0 && language[0].language === "tr") {

      // Load our allowed words from file
      const allowedList = fs.readFileSync("./files/allowed_list.txt", 'utf8').split('\r\n');
      
      // TEMP: Rewrite required later. Loops through each word in list and checks if appears
      let wordCheck = false;
      allowedList.forEach(word => {
        if(message.content.toLowerCase().includes(word)) wordCheck = true;
      });

      if(!wordCheck) {
        message.delete();
        message
          .reply(
            `not allowed! Turkish is not a supported language for Wolfteam Aeria. Please stick to English, German, or French.`
          )
          .then((msg) => msg.delete({ timeout: 5000 }))
          .catch((err) => console.error(err.message));
      }
    }
  } catch (err) {
    console.error(err);
  }
};
