const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'slot',
    category: 'Games',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        const { threadID } = event;
        try {
            // Initialize user data if not exists
            const userData = appState.users[event.senderID] || { balance: 0, bank: 0, lastDailyClaim: 0 };

            // Validate the command format
            if (args[1] !== 'spin' || !args[1]) {
                sendMessage(api, { threadID, message: 'Invalid command format. Use `/slot spin <bet amount>`' });
                return;
            }

            const betAmount = parseInt(args[1]);

            // Validate bet amount
            if (betAmount <= 0 || isNaN(betAmount)) {
                sendMessage(api, { threadID, message: 'Invalid bet amount. Please enter a positive number.' });
                return;
            }

            // Check if the user has enough balance to play
            if (userData.balance < betAmount) {
                sendMessage(api, { threadID, message: `You don't have enough balance to bet ${betAmount}.` });
                return;
            }

            // Deduct balance
            userData.balance -= betAmount;

            // Generate random slots
            const slots = [];
            for (let i = 0; i < 3; i++) {
                const randomSymbol = ['🍒', '🍇', '🍊', '🍋', '🍉'][Math.floor(Math.random() * 5)];
                slots.push(randomSymbol);
            }

            // Check for winning combinations
            let winMessage = `You lost! You bet ${betAmount} and lost it.`;
            if (slots[0] === slots[1] && slots[1] === slots[2]) {
                // Triple Match
                userData.balance += betAmount * 10; // Win 10 times the bet
                winMessage = `Congratulations! You won! You got a triple ${slots[0]}! You won ${betAmount * 10} balance!`;
            } else if (slots[0] === slots[1] || slots[1] === slots[2] || slots[0] === slots[2]) {
                // Double Match
                userData.balance += betAmount * 5; // Win 5 times the bet
                winMessage = `You won! You got a double ${slots[0]}! You won ${betAmount * 5} balance!`;
            }

            // Display the slots and the result
            sendMessage(api, { threadID, message: `Slots: ${slots.join(' | ')} \n${winMessage}` });

            // Update user data in appState
            appState.users[event.senderID] = userData;
        } catch (error) {
            console.error('Error processing command:', error);
            sendMessage(api, { threadID, message: `Error: ${error.message}` });
        }
    },
};
      
