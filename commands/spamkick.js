const fs = require('fs-extra'); // Use fs-extra for better file handling

const spamStatesFile = 'spam.json';
let spamStates = loadSpamStates();

// Set thresholds and intervals
const spamThreshold = 5; // Number of messages before a kick
const spamInterval = 60000; // Time in milliseconds for message count reset

let messageCounts = {}; // Stores message counts per user in each thread

function loadSpamStates() {
  try {
    const data = fs.readFileSync(spamStatesFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {}; // Default to empty object if file not found
  }
}

function saveSpamStates(states) {
  fs.writeFileSync(spamStatesFile, JSON.stringify(states, null, 2));
}

module.exports = {
  name: 'antispam',
  category: 'Admin',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID, senderID } = event;
    const isAdmin = admins.includes(senderID);

    if (!isAdmin) {
      sendMessage(api, { threadID, message: "You don't have permission to use this command, Only admin can use this feature." });
      return;
    }

    // Toggle anti-spam for the thread
    if (args[1] === 'on') {
      spamStates[threadID] = 'on';
      saveSpamStates(spamStates);
      sendMessage(api, { threadID, message: 'Anti-spam is now turned ON for this chat.' });
    } else if (args[1] === 'off') {
      spamStates[threadID] = 'off';
      saveSpamStates(spamStates);
      sendMessage(api, { threadID, message: 'Anti-spam is now turned OFF for this chat.' });
    } else {
      sendMessage(api, { threadID, message: "Invalid command. Please use 'on' or 'off'." });
    }
  },
  onChat: function({ api, event }) {
    const { threadID, senderID } = event;

    // Check if anti-spam is enabled for the thread
    if (spamStates[threadID] !== 'on') return; 

    // Initialize message counts for the thread if needed
    if (!messageCounts[threadID]) {
      messageCounts[threadID] = {};
    }

    // Track message counts for the sender in the thread
    if (!messageCounts[threadID][senderID]) {
      messageCounts[threadID][senderID] = {
        count: 1,
        timer: setTimeout(() => {
          delete messageCounts[threadID][senderID]; // Reset count after interval
        }, spamInterval),
      };
    } else {
      messageCounts[threadID][senderID].count++;
      if (messageCounts[threadID][senderID].count > spamThreshold) {
        api.removeUserFromGroup(senderID, threadID); // Kick the user
        sendMessage(api, { threadID, message: `User ${senderID} kicked for spamming.` });
        delete messageCounts[threadID][senderID]; // Remove count for kicked user
      }
    }
  },
};
