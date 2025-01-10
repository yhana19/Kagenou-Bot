module.exports = {
  name: 'adminlist',
  category: 'Info',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID } = event;
    let adminListMessage = "Admins 👑\n";

    for (const adminID of admins) {
      try {
        // Attempt to get the user's name using the Facebook API
        const userInfo = await api.getUserInfo(adminID);
        const userName = userInfo[adminID].name;
        adminListMessage += `-${userName} [ ${adminID} ]\n`;
      } catch (error) {
        console.error(`Error getting user info for admin ${adminID}:`, error);
        adminListMessage += `-Unknown User [ ${adminID} ]\n`; // Handle cases where name retrieval fails
      }
    }

    sendMessage(api, { threadID, message: adminListMessage });
  },
};