const axios = require('axios');

module.exports = {
  name: 'bertai',
  category: 'Fun',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID } = event;
    const query = args.join(" "); // Combine arguments into a single query
    
    if (query === "") {
      sendMessage(api, { threadID, message: "Please provide a question or statement for me to respond to." });
      return;
    }

    try {
      const response = await axios.get(`https://kaiz-apis.gleeze.com/api/bert-ai?q=${encodeURIComponent(query)}`);
      const data = response.data; // Assuming the API returns JSON

      if (data.response) {
        sendMessage(api, { threadID, message: data.response });
      } else {
        sendMessage(api, { threadID, message: "I'm sorry, I couldn't understand your request. Please try again." });
      }
    } catch (error) {
      console.error("Error calling AI API:", error);
      sendMessage(api, { threadID, message: "An error occurred while processing your request. Please try again later." });
    }
  },
};
        
