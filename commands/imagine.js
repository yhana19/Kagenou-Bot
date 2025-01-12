const axios = require('axios');

module.exports = {
  name: 'imagine',
  category: 'Fun',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID } = event;
    const prompt = args.join(" ");

    if (prompt === "") {
      sendMessage(api, { threadID, message: "Please provide a description for the image you want to see." });
      return;
    }

    try {
      const response = await axios.get(`https://kaiz-apis.gleeze.com/api/imagine?prompt=${encodeURIComponent(prompt)}`);

      // Handle API response
      if (response.status === 200) {
        const imageUrl = response.data.imageUrl; // Assuming the API returns an imageUrl
        
        // You may need to adjust this based on how the API returns image data.
        if (imageUrl) {
          sendMessage(api, { threadID, message: "Here's an image for you:", attachment: imageUrl });
        } else {
          sendMessage(api, { threadID, message: "I couldn't generate an image for that prompt. Please try again." });
        }
      } else {
        sendMessage(api, { threadID, message: "Something went wrong while generating the image. Please try again later." });
      }
    } catch (error) {
      console.error("Error calling Imagine API:", error);
      sendMessage(api, { threadID, message: "An error occurred while processing your request. Please try again later." });
    }
  },
};
    
