const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'balance',
    category: 'Info',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        const { threadID } = event;
        try {
            const userData = global.userData[event.senderID] || { balance: 0, bank: 0, lastDailyClaim: 0 }; // Access global userData

            sendMessage(api, { threadID, message: `Your current balance is: ${userData.balance}` });
        } catch (error) {
            console.error('Error processing command:', error);
            sendMessage(api, { threadID, message: `Error: ${error.message}` });
        }
    }
};
