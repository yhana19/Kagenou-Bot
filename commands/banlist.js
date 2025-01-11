module.exports = {
  name: 'banlist',
  category: 'Moderation',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage, globalData) => {
    const { threadID, senderID } = event;
    const _m = "banlist";

    if (!admins.includes(senderID)) {
      return sendMessage(api, { threadID, message: "You don't have permission to use this command." });
    }

    let banlist = await globalData.get(_m) || { data: [] };
    if (banlist.data.length === 0) {
      return sendMessage(api, { threadID, message: "There are no banned users." });
    }

    let message = "Banned Users 🚫\n";
    for (const bannedUser of banlist.data) {
      message += `- ${bannedUser.name} [${bannedUser.id}]\n`;
    }

    return sendMessage(api, { threadID, message: message });
  }
};
