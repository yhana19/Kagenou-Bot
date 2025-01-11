module.exports = {
  name: 'banlist',
  category: 'Moderation',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID, senderID } = event;

    if (!admins.includes(senderID)) {
      return sendMessage(api, { threadID, message: "You don't have permission to use this command." });
    }

    if (!global.data.banlist || global.data.banlist.length === 0) {
      return sendMessage(api, { threadID, message: "There are no banned users." });
    }

    let message = "Banned Users 🚫\n";
    for (const bannedUser of global.data.banlist) {
      message += `- ${bannedUser.name} [${bannedUser.id}]\n`;
    }

    return sendMessage(api, { threadID, message: message });
  }
};
