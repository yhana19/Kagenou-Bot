const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'Geminiflash',
    category: 'LLM',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        const { threadID } = event;
        try {
            const question = args.slice(1).join(' '); // Combine remaining args for the question

            if (!question) {
                sendMessage(api, { threadID, message: 'Please provide a question to ask Gemini.' });
                return;
            }

            // Construct the API request
            const apiUrl = 'https://ajiro.gleeze.com/api/ai'; // Use the API URL as provided
            const requestBody = {
                "model": "gemini-1.5-pro-exp-0827", // Replace with your actual API URL
                "system": "You are a LLM called Gemini  invented by Aljur Pogoy",
                "question": encodeURIComponent(question)
            };

            // Make the API call
            const response = await axios.post(apiUrl, requestBody);

            // Process the response (you'll need to adapt this to your API's format)
            if (response.status === 200) {
                const answer = response.data.answer; // Assuming your API returns an 'answer' field

                // Send the response back to the user
                sendMessage(api, { threadID, message: `Gemini says: ${answer}` });
            } else {
                // Handle API errors 
                sendMessage(api, { threadID, message: `Gemini encountered an error. Please try again later.` });
            }

        } catch (error) {
            console.error('Error processing command:', error);
            sendMessage(api, { threadID, message: `Error: ${error.message}` });
        }
    },
};
                                  
