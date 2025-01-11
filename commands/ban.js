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
      const userInfo = await api.getUserInfo(targetId);
      if (!userInfo || !userInfo[targetId] || !userInfo[targetId].name) {
        throw new Error(`Invalid user ID or API response: ${JSON.stringify(userInfo)}`);
      }
      const targetName = userInfo[targetId].name;

      // Check if already banned (using global.data)
      if (global.data.banlist && global.data.banlist.includes(targetId)) {
        return sendMessage(api, { threadID, message: `${targetName} is already banned.` });
      }

      // Ban the user (using global.data)
      global.data.banlist = global.data.banlist || []; // Initialize if needed
      global.data.banlist.push({ id: targetId, name: targetName });
      return sendMessage(api, { threadID, message: `Successfully banned ${targetName}` });

    } catch (error) {
      console.error(`Error banning user ${targetId}:`, error);
      return sendMessage(api, { threadID, message: `Error banning user. Please check the user ID and ensure the Facebook API is accessible.` });
    }
  }
};
                                                              
