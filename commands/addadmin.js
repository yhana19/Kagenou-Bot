module.exports = {
    name: 'addadmin',
    category: 'Admin',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        const { threadID } = event;
        const newAdminID = args[1];
        if (!newAdminID) {
            sendMessage(api, { threadID, message: 'Please provide the user ID to add as an admin.' });
            return;
        }
        admins.push(newAdminID);
        sendMessage(api, { threadID, message: `Added ${newAdminID} as an admin.` });
    },
};
