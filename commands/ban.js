module.exports = {
  name: 'ban',
  category: 'Moderation',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID, senderID } = event;

    if (!admins.includes(senderID)) {
      return sendMessage(api, { threadID, message: "You don't have permission to use this command." });
    }

    const targetId = args[0];
    if (!targetId) {
      return sendMessage(api, { threadID, message: "Please specify a user ID to ban." });
    }

    try {
      // Check if already banned
      if (global.data.banlist && global.data.banlist.includes(targetId)) {
        return sendMessage(api, { threadID, message: `${targetId} is already banned.` });
      }

      // Ban the user
      global.data.banlist = global.data.banlist || []; // Initialize if needed
      global.data.banlist.push(targetId);
      return sendMessage(api, { threadID, message: `Successfully banned ${targetId}` });

    } catch (error) {
      console.error(`Error banning user ${targetId}:`, error);
      return sendMessage(api, { threadID, message: `Error banning user.` });
    }
  }
};
        
