module.exports = {
  name: 'ban',
  category: 'Moderation',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage, globalData) => {
    const { threadID, senderID } = event;
    const _m = "banlist";

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

      let banlist = await globalData.get(_m) || { data: [] };
      if (banlist.data.includes(targetId)) {
        return sendMessage(api, { threadID, message: `${targetName} is already banned.` });
      }

      banlist.data.push({ id: targetId, name: targetName }); // Store ID and name
      await globalData.set(_m, banlist);
      return sendMessage(api, { threadID, message: `Successfully banned ${targetName}` });

    } catch (error) {
      console.error(`Error banning user ${targetId}:`, error);
      return sendMessage(api, { threadID, message: `Error banning user. Please check the user ID and ensure the Facebook API is accessible.` });
    }
  }
};
        
