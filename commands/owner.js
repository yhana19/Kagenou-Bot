const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'owner',
  category: 'Admin',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID } = event;

    const ownerInfo = {
      name: 'Aljur Pogoy',
      gender: 'Male',
      age: 'over 5000 Years ago',
      height: 'Null',
      facebookLink: 'https://www.facebook.com/aljur.pogoy.2024', // Placeholder, you'll likely need to extract this 
      nick: 'Seven shadosws'
    };

    const response = `Owner Information:🧾
Name: ${ownerInfo.name}
Gender: ${ownerInfo.gender}
Age: ${ownerInfo.age}
Height: ${ownerInfo.height}
Facebook: ${ownerInfo.facebookLink}
Nick: ${ownerInfo.nick}`;

    try {
      await sendMessage(api, { threadID, message: response }); // Send text first

      // Your Imgur image URL
      const imageUrl = 'https://imgur.com/a/r7Vi23B'; // Replace with your actual URL

      const tmpFolderPath = path.join(__dirname, 'tmp');
      if (!fs.existsSync(tmpFolderPath)) {
        fs.mkdirSync(tmpFolderPath);
      }

      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const imagePath = path.join(tmpFolderPath, 'owner_image.jpg'); // Adjust the extension if needed
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
        
