const fs = require('node:fs/promises');

module.exports = {
  name: 'banlist',
  category: 'Moderation',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID, senderID } = event;

    if (!admins.includes(senderID)) {
      return sendMessage(api, { threadID, message: "You don't have permission to use this command." });
    }

    try {
      const bannedUsers = JSON.parse(await fs.readFile('./banned.json', 'utf8')) || [];
      let message = "Banned Users 🚫\n";
      if (bannedUsers.length === 0) {
        message = "There are no banned users.";
      } else {
        for (const userId of bannedUsers) {
          message += `- ${userId}\n`;
        }
      }
      return sendMessage(api, { threadID, message });
    } catch (error) {
      console.error('Error getting ban list:', error);
      return sendMessage(api, { threadID, message: 'Error getting ban list.' });
    }
  }
};
