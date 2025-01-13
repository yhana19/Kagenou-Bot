const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'bank',
    category: 'Games',
    execute: async (api, event, args, commands, prefix, admins, userData, sendMessage) => {
        const { threadID } = event;
        try {
            const senderID = event.senderID;

            // Check the second argument for deposit or withdraw
            const action = args[1];
            const amount = parseInt(args[2]);

            // Validate amount
            if (!amount || amount <= 0) {
                sendMessage(api, { threadID, message: 'Please enter a valid amount.' });
                return;
            }

            if (action === 'deposit') {
                // Deposit
                if (userData[senderID].balance < amount) {
                    sendMessage(api, { threadID, message: 'Insufficient balance.' });
                    return;
                }
                userData[senderID].balance -= amount;
                userData[senderID].bank += amount;
                sendMessage(api, { threadID, message: `You deposited ${amount} into your bank. Your new balance is ${userData[senderID].balance} and bank balance is ${userData[senderID].bank}` });
            } else if (action === 'withdraw') {
                // Withdraw
                if (userData[senderID].bank < amount) {
                    sendMessage(api, { threadID, message: 'Insufficient bank balance.' });
                    return;
                }
                userData[senderID].bank -= amount;
                userData[senderID].balance += amount;
                sendMessage(api, { threadID, message: `You withdrew ${amount} from your bank. Your new balance is ${userData[senderID].balance} and bank balance is ${userData[senderID].bank}` });
            } else {
                sendMessage(api, { threadID, message: 'Invalid action. Please use "deposit" or "withdraw".' });
            }

        } catch (error) {
            console.error('Error processing command:', error);
            sendMessage(api, { threadID, message: `Error: ${error.message}` });
        }
    },
};
