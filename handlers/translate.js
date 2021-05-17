const axios = require('axios');
require('dotenv').config();

module.exports.translate = async (text, language) => {
  if (!text || !language) return;

  try {
    const response = await axios.get(`https://api-free.deepl.com/v2/translate?auth_key=${process.env.DEEPL_API}&text=${text}&target_lang=${language}`);
    // eslint-disable-next-line consistent-return
    return response.data.translations[0].text;
  // eslint-disable-next-line no-console
  } catch (error) { console.error(error); }
};
