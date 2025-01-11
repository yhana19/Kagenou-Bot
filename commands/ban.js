const fs = require('node:fs/promises'); // Import fs.promises for async file operations

module.exports = {
  name: 'ban',
  category: 'Moderation',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID, senderID } = event;
    const targetId = args[0];

    if (!admins.includes(senderID)) {
      return sendMessage(api, { threadID, message: "You don't have permission to use this command." });
    }

    if (!targetId) {
      return sendMessage(api, { threadID, message: "Please specify a user ID to ban." });
    }

    try {
      const bannedUsers = JSON.parse(await fs.readFile('./banned.json', 'utf8')) || [];
      if (bannedUsers.includes(targetId)) {
        return sendMessage(api, { threadID, message: `${targetId} is already banned.` });
      }
      bannedUsers.push(targetId);
      await fs.writeFile('./banned.json', JSON.stringify(bannedUsers, null, 2));
      return sendMessage(api, { threadID, message: `Successfully banned ${targetId}` });
    } catch (error) {
      console.error('Error banning user:', error);
      return sendMessage(api, { threadID, message: 'Error banning user.' });
    }
  }
};
                    
