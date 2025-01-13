const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'daily',
    category: 'Games',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        const { threadID } = event;
        try {
            // Store user data within the command context
            const userData = this.userData[event.senderID] || { balance: 0, bank: 0, lastDailyClaim: 0 }; 

            // Get current time in seconds
            const now = Math.floor(Date.now() / 1000);

            // Check if 24 hours have passed since last claim
            if (now - userData.lastDailyClaim >= 86400) { // 86400 seconds = 24 hours
                // Give daily balance
                userData.balance += 700; // Adjust the daily balance as needed
                userData.lastDailyClaim = now; 
                sendMessage(api, { threadID, message: 'You claimed your daily balance of 10! Come back tomorrow for another!' });
            } else {
                // Calculate remaining time
                const remainingTime = 86400 - (now - userData.lastDailyClaim);
                const hours = Math.floor(remainingTime / 3600);
                const minutes = Math.floor((remainingTime % 3600) / 60);
                const seconds = remainingTime % 60;

                sendMessage(api, { threadID, message: `You can claim your daily balance in ${hours} hours, ${minutes} minutes, and ${seconds} seconds.` });
            }

            // Update user data within the command context
            this.userData[event.senderID] = userData; 
        } catch (error) {
            console.error('Error processing command:', error);
            sendMessage(api, { threadID, message: `Error: ${error.message}` });
        }
    },
    userData: {} // Initialize an empty object to store user data
};
                                                                                                             
