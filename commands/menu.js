const axios = require('axios');
module.exports = {
  name: 'menu',
  category: 'Info',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID } = event;
    const commandList = Object.values(commands).map(command => `${prefix}${command.name}`);
    const helpMessage = `Available Commands:
${commandList.join('\n')}`;
    try {
      // Example image URL
      const imageResponse = await axios.get('https://i.imgur.com/a/r7Vi23B.jpg', { responseType: 'stream' }); 
      await sendMessage(api, { threadID, message: helpMessage, attachment: imageResponse.data });
    } catch (error) {
      console.error("Error downloading or sending image:", error);
      await sendMessage(api, { threadID, message: "Error sending image. Please try again." });
    }
  },
};
  
