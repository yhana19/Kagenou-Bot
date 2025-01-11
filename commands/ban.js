const fs = require('node:fs/promises');

module.exports = {
  name: 'ban',
  category: 'Moderation',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID, senderID } = event;
    const targetId = args[0];

    if (!admins.includes(senderID)) {
      return sendMessage(api, { threadID, message: "You don't have permission to use this command." });
    }

    if (!targetId) {
      return sendMessage(api, { threadID, message: "Please specify a user ID to ban." });
    }

    try {
     
      let bannedUsers = JSON.parse(await fs.readFile('./banned.json', 'utf8')) || [];
      console.log("Current banned users before adding:", bannedUsers); // DEBUG: Check current list

      
      if (bannedUsers.includes(targetId)) {
        return sendMessage(api, { threadID, message: `${targetId} is already banned.` });
      }

      
      bannedUsers.push(targetId);
      console.log("Banned users after adding:", bannedUsers); // DEBUG: Check updated list

     
      await fs.writeFile('./banned.json', JSON.stringify(bannedUsers, null, 2));
      console.log("File successfully written."); // DEBUG: Confirm write

      return sendMessage(api, { threadID, message: `Successfully banned ${targetId}` });

    } catch (error) {
      console.error('Error banning user:', error); // Log the complete error
      return sendMessage(api, { threadID, message: 'Error banning user.  Check the console for details.' });
    }
  }
};
