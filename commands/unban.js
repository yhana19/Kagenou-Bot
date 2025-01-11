const { post, get } = require("axios"); 

module.exports = {
  name: 'unban',
  category: 'Moderation',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID, senderID } = event;
    const _m = "banlist"; 

    if (!admins.includes(senderID)) { 
      return sendMessage(api, { threadID, message: "You don't have permission to use this command." });
    }

    const targetId = args[0];

    if (!targetId) {
      return sendMessage(api, { threadID, message: "Please specify a user ID to unban." });
    }

    try {
      const userInfo = await api.getUserInfo(targetId);
      const targetName = userInfo[targetId].name; // Get the real name

      // Check if user is banned
      let banlist = await globalData.get(_m) || { data: [] };
      if (!banlist.data.includes(targetId)) {
        return sendMessage(api, { threadID, message: `${targetName} is not banned.` });
      }

      // Unban the user
      banlist.data = banlist.data.filter(id => id !== targetId);
      await globalData.set(_m, banlist);
      return sendMessage(api, { threadID, message: `Successfully unbanned ${targetName}` });

    } catch (error) {
      console.error(`Error getting user info for ${targetId}:`, error);
      return sendMessage(api, { threadID, message: `Error unbanning user. Please check the user ID.` });
    }
  }
};
