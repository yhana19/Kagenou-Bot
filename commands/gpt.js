axios = require('axios');

module.exports = {
  name: 'gpt4',
  category: 'Cid Bot',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID } = event;
    const prompt = args.join(' ');

    try {
      // Encode the prompt before sending to the API
      const encodedPrompt = encodeURIComponent(prompt);

      // Construct the API URL with the encoded prompt
      const apiUrl = `https://www.niroblr.cloud/api/gpt4?prompt=${encodedPrompt}`; 

      const response = await axios.get(apiUrl); // Use GET for your API
      const answer = response.data.response.answer; // Adjust based on your API response

      sendMessage(api, { threadID, message: answer });
    } catch (error) {
      console.error('Error with AI command:', error);
      sendMessage(api, { threadID, message: 'Sorry, I couldn\'t process that request. Please try again.' });
    }
  }
};