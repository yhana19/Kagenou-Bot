// prefix.js
const axios = require('axios');

module.exports = {
  name: 'prefix',
  category: 'Info',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID } = event;
    const currentPrefix = prefix; // Get the prefix from the main bot file

    try {
      // Fetch the Imgur image (replace with your Imgur image link)
      const response = await axios.get('https://imgur.com/a/r7Vi23B', { responseType: 'arraybuffer' });
      const imgBuffer = Buffer.from(response.data, 'binary');

      // Send the message with the image attachment
      api.sendMessage({
        body: `🌐 System Prefix: \`${currentPrefix}\``,
        attachment: imgBuffer,
      }, threadID);
    } catch (error) {
      console.error('Error fetching or sending image:', error);
      sendMessage(api, { threadID, message: `The bot's prefix is: \`${currentPrefix}\`\nError displaying image.` });
    }
  },
};
      
