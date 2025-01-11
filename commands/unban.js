const fs = require('node:fs/promises');
const path = require('path');

module.exports = {
    name: 'unban',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        if (!admins.includes(event.senderID)) {
            return sendMessage(api, { threadID: event.threadID, message: 'You do not have permission to use this command.' });
        }

        const userID = args[1];
        if (!userID) {
            return sendMessage(api, { threadID: event.threadID, message: 'Please specify a user ID to unban.' });
        }

        try {
            const banlistPath = path.join(__dirname, 'banlist.json');
            let banlist = JSON.parse(await fs.readFile(banlistPath, 'utf8')) || [];
            banlist = banlist.filter((user) => user.userID !== userID);
            await fs.writeFile(banlistPath, JSON.stringify(banlist, null, 2));
            sendMessage(api, { threadID: event.threadID, message: `${userID} has been unbanned.` });
        } catch (error) {
            console.error('Error unbanning user:', error);
            sendMessage(api, { threadID: event.threadID, message: 'Error unbanning user. Please check the console for details.' });
        }
    },
};
