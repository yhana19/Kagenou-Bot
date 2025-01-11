const { post, get } = require("axios"); 

module.exports = {
  name: 'banlist',
  category: 'Moderation',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID, senderID } = event;
    const _m = "banlist"; 

    if (!admins.includes(senderID)) { 
      return sendMessage(api, { threadID, message: "You don't have permission to use this command." });
    }

    let banlist = await globalData.get(_m) || { data: [] };
    if (banlist.data.length === 0) {
      return sendMessage(api, { threadID, message: "There are no banned users." });
    }

    let message = "Banned Users:\n";
    for (const bannedId of banlist.data) {
      try {
        const userInfo = await api.getUserInfo(bannedId);
        const bannedName = userInfo[bannedId].name;
        message += `- ${bannedName} [${bannedId}]\n`;
      } catch (error) {
        console.error(`Error getting user info for ${bannedId}:`, error);
        message += `- Unknown User [${bannedId}]\n`;
      }
    }

    return sendMessage(api, { threadID, message: message });
  }
};
