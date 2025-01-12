const axios = require('axios');
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
      const imageResponse = await axios.get(developer.imageUrl, { responseType: 'stream' });  
await sendMessage(api, { threadID, message: response, attachment:  imageResponse.data });

    } catch (error) {
      console.error("Error downloading or sending image:", error);
      await sendMessage(api, { threadID, message: "Error sending image. Please try again." });
    }
  },
};
