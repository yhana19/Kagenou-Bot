module.exports = {
    name: 'sendmessage',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        if (!admins.includes(event.senderID)) return sendMessage(api, { threadID: event.threadID, message: 'Admin only command.' });
        const userID = args[1];
        const message = args.slice(1).join(' ');
        if (!userID || !message) return sendMessage(api, { threadID: event.threadID, message: 'Please provide a user ID and a message.' });
        sendMessage(api, { threadID: userID, message: message });
    },
};
