const axios = require('axios');

module.exports = {
  name: 'prefix',
  category: 'Info',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID } = event;
    const currentPrefix = prefix;

    try {
      // Fetch the image from Google Drive (replace with your Google Drive image link)
      const response = await axios.get('https://drive.google.com/file/d/1CNXQ7AWkQUpxIbQT3-wRmRPiL1VhS9be/view?usp=drivesdk', { responseType: 'arraybuffer' }); //Change this

      // Check the response status code
      if (response.status !== 200) {
        throw new Error(`Google Drive returned status code ${response.status}`);
      }

      const imgBuffer = Buffer.from(response.data, 'binary');

      api.sendMessage({
        body: `🌐 Global system prefix: \`${currentPrefix}\``,
        attachment: imgBuffer,
      }, threadID);
    } catch (error) {
      console.error('Error fetching or sending image:', error);
      sendMessage(api, { threadID, message: `The bot's prefix is: \`${currentPrefix}\`\nError displaying image: ${error.message}` });
    }
  },
};
                  
