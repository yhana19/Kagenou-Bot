module.exports = {
    name: 'setprefix',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        if (!admins.includes(event.senderID)) return sendMessage(api, { threadID: event.threadID, message: 'Admin only command.' });
        const newPrefix = args[1];
        if (!newPrefix) return sendMessage(api, { threadID: event.threadID, message: 'Please specify a new prefix.' });
        // Add your prefix update logic here, potentially involving writing to a config file.
        sendMessage(api, { threadID: event.threadID, message: `Prefix changed to: ${newPrefix}` });
    },
};
