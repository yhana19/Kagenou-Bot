const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'gpt4pro',
    category: 'LLM',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        const { threadID, senderID, attachments } = event;
        try {
            const question = args.slice(1).join(' '); // Combine remaining args for the question
            let imageUrl = '';

            // Check for image attachments
            if (attachments && attachments.length > 0) {
                imageUrl = attachments[0].url;
            }

            // Construct the API request
            const apiUrl = 'https://kaiz-apis.gleeze.com/api/gpt-4o-pro';
            const requestBody = {
                "q": question,
                "uid": 1, // Replace with the appropriate UID for your API
                "imageUrl": imageUrl
            };

            // Make the API call
            const response = await axios.post(apiUrl, requestBody);

            // Process the response (you'll need to adapt this to your API's format)
            if (response.status === 200) {
                const answer = response.data[0].content.url_content.response; // Assuming your API returns an 'answer' field

                // Send the response back to the user
                sendMessage(api, { threadID, message: `GPT-4 Pro says: ${answer}` });
            } else {
                // Handle API errors 
                sendMessage(api, { threadID, message: `GPT-4 Pro encountered an error. Please try again later.` });
            }

        } catch (error) {
            console.error('Error processing command:', error);
            sendMessage(api, { threadID, message: `Error: ${error.message}` });
        }
    },
};
                              
