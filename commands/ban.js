const fs = require('node:fs/promises');
const path = require('path');

module.exports = {
    name: 'ban',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        if (!admins.includes(event.senderID)) {
            return sendMessage(api, { threadID: event.threadID, message: 'You do not have permission to use this command.' });
        }

        const userID = args[1];
        if (!userID) {
            return sendMessage(api, { threadID: event.threadID, message: 'Please specify a user ID to ban.' });
        }

        try {
            const banlistPath = path.join(__dirname, 'banlist.json');
            let banlist = JSON.parse(await fs.readFile(banlistPath, 'utf8')) || [];

            // Get user info (replace with your actual user info retrieval)
            const userInfo = await api.getUserInfo(userID);
            const userName = userInfo[userID].name;

            banlist.push({ userID, userName });
            await fs.writeFile(banlistPath, JSON.stringify(banlist, null, 2));
            sendMessage(api, { threadID: event.threadID, message: `${userName} (ID: ${userID}) has been banned.` });
        } catch (error) {
            console.error('Error banning user:', error);
            sendMessage(api, { threadID: event.threadID, message: 'Error banning user. Please check the console for details.' });
        }
    },
};
          
