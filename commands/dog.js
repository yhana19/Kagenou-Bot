const axios = require('axios');

module.exports = {
  name: 'dog',
  category: 'Fun',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID, senderID } = event;

    try {
      const response = await axios.get('https://random.dog/woof.json');
      const dogImageUrl = response.data.url;

      sendMessage(api, { threadID, message: 'Here\'s a good boy/girl!', attachment: [{ type: 'image', url: dogImageUrl }] });

    } catch (error) {
      console.error('Error fetching dog image:', error);
      sendMessage(api, { threadID, message: 'Error fetching dog image. Please try again later.' });
    }
  }
};
