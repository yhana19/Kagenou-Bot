const axios = require('axios');

module.exports = {
  name: 'gemini',
  category: 'Cid Bot',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID } = event;
    const prompt = args.join(' ');

    try {
      
      const encodedPrompt = encodeURIComponent(prompt);

    
      const apiUrl = `https://kaiz-apis.gleeze.com/api/bert-ai?prompt=${encodedPrompt}`; 

      const response = await axios.get(apiUrl); // Use GET for your API
      const answer = response.data.response.answer; // Adjust based on your API response

      sendMessage(api, { threadID, message: answer });
    } catch (error) {
      console.error('Error with AI command:', error);
      sendMessage(api, { threadID, message: 'Sorry, I couldn\'t process that request. Please try again.' });
    }
  }
};
