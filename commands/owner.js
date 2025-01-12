const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'owner',
  category: 'Utils',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID } = event;

    const ownerInfo = {
      name: 'Aljur Pogoy',
      gender: 'Male',
      age: 'over 5000 Years ago',
      height: 'Null',
      facebookLink: 'https://www.facebook.com/profile.php?id=100073129302064',
      nick: 'Seven Shadow'
    };

    const response = `
Owner Information:🧾
Name: ${ownerInfo.name}
Gender: ${ownerInfo.gender}
Age: ${ownerInfo.age}
Height: ${ownerInfo.height}
Facebook: ${ownerInfo.facebookLink}
Nick: ${ownerInfo.nick}
`;

    try {
      await sendMessage(api, { threadID, message: response }); // Send text first

      // Replace 'YOUR_IMGUR_VIDEO_URL' with your actual Imgur video URL
      const videoUrl = 'https://imgur.com/a/seven-shadow-Ht8jilP';

      const tmpFolderPath = path.join(__dirname, 'tmp');
      if (!fs.existsSync(tmpFolderPath)) {
        fs.mkdirSync(tmpFolderPath);
      }

      const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
      const videoPath = path.join(tmpFolderPath, 'owner_video.mp4'); // You can adjust the extension if needed
      fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

      await sendMessage(api, {
        threadID,
        attachment: fs.createReadStream(videoPath)
      }); 

    } catch (error) {
      console.error("Error downloading or sending video:", error);
      await sendMessage(api, { threadID, message: "Error sending video. Please try again." });
    }
  },
};

      
