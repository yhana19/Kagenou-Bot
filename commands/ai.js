const axios = require('axios');

module.exports = {
  name: 'ai',
  category: 'Cid Bot',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID } = event;
    const prompt = args.join(' ');

    try {
      
      const encodedPrompt = encodeURIComponent(prompt);

      
      const apiUrl = `https://www.niroblr.cloud/api/gpt4?prompt=${encodedPrompt}`; 

      const response = await axios.get(apiUrl);
      const answer = response.data.response.answer;

      sendMessage(api, { threadID, message: answer });
    } catch (error) {
      console.error('Error with AI command:', error);
      sendMessage(api, { threadID, message: 'Sorry, I couldn\'t process that request. Please try again.' });
    }
  }
};
