const axios = require('axios');

module.exports = {
  name: 'addadmin',
  description: 'Add a user as an admin.',
  author: 'coffee',
  usage: '/addadmin <facebook_user_id>',
  async execute(api, event, args, commands, prefix, admins, appState, sendMessage) {
    const { threadID, senderID } = event;

    if (!args || args.length < 1) {
      return sendMessage(api, { threadID, message: 'Please provide a Facebook user ID to add as an admin.' });
    }

    const newAdminID = args[0];

    if (admins.includes(newAdminID)) {
      return sendMessage(api, { threadID, message: `User with ID ${newAdminID} is already an admin.` });
    }

    admins.push(newAdminID);
    // Save updated admins list to your storage (e.g., appState.json)
    // ... (Implement saving logic)

    try {
      const userInfo = await api.getUserInfo(newAdminID);
      const userName = userInfo[newAdminID].name;
      sendMessage(api, { threadID, message: `Successfully added ${userName} (ID: ${newAdminID}) as an admin!` });
    } catch (error) {
      console.error(`Error getting user info for admin ${newAdminID}:`, error);
      sendMessage(api, { threadID, message: `Successfully added user with ID ${newAdminID} as an admin!` });
    }

    // Trigger the 'adminlist' command to show the updated list:
    const adminlistCommand = commands.get('adminlist');
    if (adminlistCommand) {
      await adminlistCommand.execute(api, event, args, commands, prefix, admins, appState, sendMessage);
    } else {
      console.error("Adminlist command not found!");
    }
  },
};
