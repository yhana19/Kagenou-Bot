const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'ban',
    category: 'Admin',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        const { threadID } = event;
        const userIDToBan = args[1];

        if (!userIDToBan) {
            sendMessage(api, { threadID, message: 'Please provide the user ID to ban.' });
            return;
        }

        // Check if the user is already banned
        if (appState.bannedUsers.includes(userIDToBan)) {
            sendMessage(api, { threadID, message: `${userIDToBan} is already banned.` });
            return;
        }

        // Add the user to the banned list
        appState.bannedUsers.push(userIDToBan);

        // Save the updated banned list
        fs.writeFileSync('./appstate.json', JSON.stringify(appState, null, 2));

        sendMessage(api, { threadID, message: `${userIDToBan} has been banned.` });
    },
};
