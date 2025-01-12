const axios = require('axios');

module.exports = {
  name: 'spamkick',
  category: 'Admin', 
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID, senderID, body } = event;
    const isAdmin = admins.includes(senderID);

    if (!isAdmin) {
      sendMessage(api, { threadID, message: "You don't have permission to use this command." });
      return;
    }

    if (args.length === 0) {
      sendMessage(api, { threadID, message: "Please specify 'on' or 'off' to toggle spamkick." });
      return;
    }

    const action = args[1].toLowerCase();
    if (action === 'on') {
      // Turn spamkick ON
      appState.spamkick = true; // Store the state in appState
      sendMessage(api, { threadID, message: "Spamkick is now turned ON for this chat." });
    } else if (action === 'off') {
      // Turn spamkick OFF
      appState.spamkick = false; // Store the state in appState
      sendMessage(api, { threadID, message: "Spamkick is now turned OFF for this chat." });
    } else {
      sendMessage(api, { threadID, message: "Invalid command. Please use 'on' or 'off'." });
    }
  },
};
    
