const fs = require('node:fs/promises');

module.exports = {
  name: 'unban',
  category: 'Moderation',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID, senderID } = event;
    const targetId = args[0];

    if (!admins.includes(senderID)) {
      return sendMessage(api, { threadID, message: "You don't have permission to use this command." });
    }

    if (!targetId) {
      return sendMessage(api, { threadID, message: "Please specify a user ID to unban." });
    }

    try {
      const bannedUsers = JSON.parse(await fs.readFile('./banned.json', 'utf8')) || [];
      const index = bannedUsers.indexOf(targetId);
      if (index === -1) {
        return sendMessage(api, { threadID, message: `${targetId} is not banned.` });
      }
      bannedUsers.splice(index, 1);
      await fs.writeFile('./banned.json', JSON.stringify(bannedUsers, null, 2));
      return sendMessage(api, { threadID, message: `Successfully unbanned ${targetId}` });
    } catch (error) {
      console.error('Error unbanning user:', error);
      return sendMessage(api, { threadID, message: 'Error unbanning user.' });
    }
  }
};
                                                       
