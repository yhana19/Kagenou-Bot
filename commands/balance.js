const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'balance',
    category: 'Info',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        const { threadID } = event;
        try {
            // Store user data within the command context
            const userData = this.userData[event.senderID] || { balance: 0, bank: 0, lastDailyClaim: 0 }; 

            sendMessage(api, { threadID, message: `Your current balance is: ${userData.balance}` });
        } catch (error) {
            console.error('Error processing command:', error);
            sendMessage(api, { threadID, message: `Error: ${error.message}` });
        }
    },
    userData: {} // Initialize an empty object to store user data
};
