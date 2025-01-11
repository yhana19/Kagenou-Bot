module.exports = {
  name: 'unban',
  category: 'Moderation',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID, senderID } = event;

    if (!admins.includes(senderID)) {
      return sendMessage(api, { threadID, message: "You don't have permission to use this command." });
    }

    const targetId = args[0];
    if (!targetId) {
      return sendMessage(api, { threadID, message: "Please specify a user ID to unban." });
    }

    try {
      // Check if banned (using global.data)
      if (!global.data.banlist || !global.data.banlist.some(user => user.id === targetId)) {
        return sendMessage(api, { threadID, message: `${targetId} is not banned.` });
      }

      // Unban the user (using global.data)
      global.data.banlist = global.data.banlist.filter(user => user.id !== targetId);
      return sendMessage(api, { threadID, message: `Successfully unbanned ${targetId}` }); // No name needed here

    } catch (error) {
      console.error(`Error unbanning user ${targetId}:`, error);
      return sendMessage(api, { threadID, message: `Error unbanning user. Please check the user ID.` });
    }
  }
};
