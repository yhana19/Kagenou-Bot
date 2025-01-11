const fs = require('node:fs/promises');

module.exports = {
  name: 'ban',
  category: 'Moderation',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID, senderID, body } = event; // Use 'body' to get the full message

    if (!admins.includes(senderID)) {
      return sendMessage(api, { threadID, message: "You don't have permission to use this command." });
    }

    // Parse the command:  Split the message at the pipe symbol
    const parts = body.split('|');
    if (parts.length !== 2 || parts[0].trim() !== '/ban') {
      return sendMessage(api, { threadID, message: "Invalid command format. Use `/ban | Facebook ID`" });
    }

    const targetId = parts[1].trim();
    if (!targetId) {
      return sendMessage(api, { threadID, message: "Please specify a Facebook ID to ban." });
    }

    try {
      let bannedUsers = JSON.parse(await fs.readFile('./banned.json', 'utf8')) || [];
      console.log("Current banned users before adding:", bannedUsers); 

      if (bannedUsers.includes(targetId)) {
        return sendMessage(api, { threadID, message: `${targetId} is already banned.` });
      }

      bannedUsers.push(targetId);
      console.log("Banned users after adding:", bannedUsers); 

      await fs.writeFile('./banned.json', JSON.stringify(bannedUsers, null, 2));
      console.log("File successfully written."); 

      return sendMessage(api, { threadID, message: `Successfully banned ${targetId}` });

    } catch (error) {
      console.error('Error banning user:', error); 
      return sendMessage(api, { threadID, message: 'Error banning user. Check the console for details.' });
    }
  }
};
        
