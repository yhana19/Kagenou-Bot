const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'developer',
  category: 'Admin',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID } = event;

    const developer = {
      name: 'Aljur Pogoy', 
      gfname: 'Ana Sophia',
      height: "5'8",
      age: 17,
      imageUrl: 'https://imgur.com/a/r7Vi23B.jpg'
    };

    const response = `Developer Information 🧾
Name: ${developer.name}
gfname: ${developer.gfname}
height: ${developer.height}
Age: ${developer.age}`;

    try {
      
      await sendMessage(api, { threadID, message: response });

      

      const imageResponse = await axios.get(developer.imageUrl, { responseType: 'stream' });

      

      const msg = {
        body: '',
        attachment: imageResponse.data
      };

      await sendMessage(api, msg, event.threadID); 

    } catch (error) {
      console.error("Error downloading or sending image:", error);
      await sendMessage(api, { threadID, message: "Error sending image. Please try again." });
    }
  },
};
