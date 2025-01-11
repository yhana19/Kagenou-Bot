const fs = require('node:fs/promises');
const path = require('path');

module.exports = {
    name: 'banlist',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        if (!admins.includes(event.senderID)) {
            return sendMessage(api, { threadID: event.threadID, message: 'You do not have permission to use this command.' });
        }

        try {
            const banlistPath = path.join(__dirname, 'banlist.json');
            const banlist = JSON.parse(await fs.readFile(banlistPath, 'utf8')) || [];

            if (banlist.length === 0) {
                return sendMessage(api, { threadID: event.threadID, message: '🚫 Banned list 🚫\nNo users are currently banned.' });
            }

            const banListMessage = banlist.map((user) => `- ${user.userName} (ID: ${user.userID})`).join('\n');
            sendMessage(api, { threadID: event.threadID, message: `🚫 Banned list 🚫\n${banListMessage}` });
        } catch (error) {
            console.error('Error retrieving ban list:', error);
            sendMessage(api, { threadID: event.threadID, message: 'Error retrieving ban list. Please check the console for details.' });
        }
    },
};
