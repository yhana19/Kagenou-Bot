const fs = require('node:fs/promises');
const { api } = require('./index'); // Assuming api is exported from index.js

module.exports = {
  name: 'banlist',
  category: 'Mod',
    // ... (other parts of banlist.js remain the same)

    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        // ... (admin check remains the same)

        try {
            const bannedUsers = JSON.parse(await fs.readFile('./banned.json', 'utf8')) || [];
            let message = "Banned Users 🚫\n";
            if (bannedUsers.length === 0) {
                message = "There are no banned users.";
            } else {
                for (const userId of bannedUsers) {
                    try {
                        const userInfo = await api.getUserInfo(userId);
                        const userName = userInfo[userId].name;
                        message += `- ${userName} [${userId}]\n`;
                    } catch (error) {
                        console.error(`Error getting user info for ${userId}:`, error);
                        message += `- Unknown User [${userId}]\n`;
                    }
                }
            }
            return sendMessage(api, { threadID, message });
        } catch (error) {
            console.error('Error getting ban list:', error);
            return sendMessage(api, { threadID, message: 'Error getting ban list.' });
        }
    }
};
                          
