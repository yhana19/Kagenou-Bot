module.exports = {
  name: 'unban',
  category: 'Moderation',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage, globalData) => {
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
      let banlist = await globalData.get(_m) || { data: [] };
      const userIndex = banlist.data.findIndex(user => user.id === targetId);

      if (userIndex === -1) {
        return sendMessage(api, { threadID, message: `${targetId} is not banned.` });
      }

      const targetName = banlist.data[userIndex].name; // Get name from banlist
      banlist.data.splice(userIndex, 1);
      await globalData.set(_m, banlist);
      return sendMessage(api, { threadID, message: `Successfully unbanned ${targetName}` });

    } catch (error) {
      console.error(`Error unbanning user ${targetId}:`, error);
      return sendMessage(api, { threadID, message: `Error unbanning user. Please check the user ID.` });
    }
  }
};
