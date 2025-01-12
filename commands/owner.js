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
      imageUrl: '../image/c55534714fe57cdb9e580d32923c8856.jpg' // Use relative path to image
    };
    const message = `Developer Information 🧾
Name: ${developer.name}
gfname: ${developer.gfname}
height: ${developer.height}
Age: ${developer.age}`;
    try {
      // Fetch the image from the local file system
      const imageResponse = await axios.get(`file://${developer.imageUrl}`, { responseType: 'stream' });
      await sendMessage(api, { threadID, message, attachment: imageResponse.data });
    } catch (error) {
      console.error("Error downloading or sending image:", error);
      await sendMessage(api, { threadID, message: "Error sending image. Please try again." });
    }
  },
};
