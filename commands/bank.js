const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'bank',
    category: 'Games',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        const { threadID } = event;
        try {
            // Initialize user data if not exists
            const userData = appState.users[event.senderID] || { balance: 0, bank: 0, lastDailyClaim: 0 };

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
                if (userData.balance < amount) {
                    sendMessage(api, { threadID, message: 'Insufficient balance.' });
                    return;
                }
                userData.balance -= amount;
                userData.bank += amount;
                sendMessage(api, { threadID, message: `You deposited ${amount} into your bank. Your new balance is ${userData.balance} and bank balance is ${userData.bank}` });
            } else if (action === 'withdraw') {
                // Withdraw
                if (userData.bank < amount) {
                    sendMessage(api, { threadID, message: 'Insufficient bank balance.' });
                    return;
                }
                userData.bank -= amount;
                userData.balance += amount;
                sendMessage(api, { threadID, message: `You withdrew ${amount} from your bank. Your new balance is ${userData.balance} and bank balance is ${userData.bank}` });
            } else {
                sendMessage(api, { threadID, message: 'Invalid action. Please use "deposit" or "withdraw".' });
            }

            // Update user data in appState
            appState.users[event.senderID] = userData;
        } catch (error) {
            console.error('Error processing command:', error);
            sendMessage(api, { threadID, message: `Error: ${error.message}` });
        }
    },
};
              
