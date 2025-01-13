const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'unban',
    category: 'Admin',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        const { threadID } = event;
        const userIDToUnban = args[1];

        if (!userIDToUnban) {
            sendMessage(api, { threadID, message: 'Please provide the user ID to unban.' });
            return;
        }

        // Remove the user from the banned list
        const index = appState.bannedUsers.indexOf(userIDToUnban);
        if (index > -1) {
            appState.bannedUsers.splice(index, 1);
            sendMessage(api, { threadID, message: `${userIDToUnban} has been unbanned.` });
        } else {
            sendMessage(api, { threadID, message: `${userIDToUnban} is not banned.` });
        }

        // Save the updated banned list
        fs.writeFileSync('./appstate.json', JSON.stringify(appState, null, 2));
    },
};
