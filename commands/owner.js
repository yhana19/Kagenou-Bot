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
      imageUrl: 'https://imgur.com/a/r7Vi23B.jpg' // Replace with your Imgur image URL
    };

    const response = `Developer Information 🧾
Name: ${developer.name}
gfname: ${developer.gfname}
height: ${developer.height}
Age: ${developer.age}`;

    try {
      // Send text first
      await sendMessage(api, { threadID, message: response });

      // Download and send the image
      const tmpFolderPath = path.join(__dirname, 'tmp');
      if (!fs.existsSync(tmpFolderPath)) {
        fs.mkdirSync(tmpFolderPath);
      }

      const imageResponse = await axios.get(developer.imageUrl, { responseType: 'arraybuffer' });
      const imagePath = path.join(tmpFolderPath, 'developer_image.jpg');
      fs.writeFileSync(imagePath, Buffer.from(imageResponse.data, 'binary'));

      const msg = {
        body: '', // No body needed
        attachment: fs.createReadStream(imagePath)
      };

      await sendMessage(api, msg, event.threadID); 

    } catch (error) {
      console.error("Error downloading or sending image:", error);
      await sendMessage(api, { threadID, message: "Error sending image. Please try again." });
    }
  },
};
