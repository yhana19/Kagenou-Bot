module.exports = {
    name: 'bank',
    description: 'Check your current balance.',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage, usersData, getLang) => {
        const { senderID, threadID } = event;

        try {
            const userData = await usersData.get(senderID) || { money: 0, data: {} }; //get user data, or create default if not exist
            const balance = userData.money;
            sendMessage(api, { threadID, message: `Your current balance is: $${balance}` });
        } catch (error) {
            console.error("Error checking balance:", error);
            sendMessage(api, { threadID, message: "An error occurred while checking your balance." });
        }
    },
};
