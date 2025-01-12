const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'owner',
  category: 'Admin',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID } = event;

    const ownerInfo = {
      name: 'Aljur Pogoy & jun jaam',
      gender: 'Male',
      age: 'over 50000 Years ago',
      height: 'Null',
      facebookLink: 'https://www.facebook.com/profile.php?id=100073129302064',
      nick: 'Seven Shadows'
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

      // Your image dictionary - replace with your actual image files
      const imageDict = {
        'image1': 'image/c55534714fe57cdb9e580d32923c8856.jpg'
        // ... more image file names
      };

      // Choose an image from the dictionary - you'll need to modify this logic
      const imageName = 'image1'; // Replace with your selection logic 
      const imagePath = path.join(__dirname, imageDict[imageName]); 

      const msg = {
        body: "",
        attachment: fs.createReadStream(imagePath) 
      };

      await sendMessage(api, msg, event.threadID); 

    } catch (error) {
      console.error("Error sending owner info or image:", error);
      await sendMessage(api, { threadID, message: "Error sending owner information. Check console logs." });
    }
  },
};
