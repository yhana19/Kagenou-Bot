const moment = require('moment-timezone');

module.exports = {
    name: 'daily',
    description: 'Claim your daily reward.',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage, usersData) => {
        const { senderID, threadID } = event;
        const dailyReward = 1000;

        try {
            // 1. Retrieve user data, create if doesn't exist
            let userData = await usersData.get(senderID);
            if (!userData) {
                userData = { money: 0, data: { lastClaimed: 0 } };
                await usersData.set(senderID, userData);
                console.log(`Created new user data for ${senderID}`);
            }

            // 2. Use moment-timezone for time comparison.  Specify timezone if needed!
            const lastClaimed = moment(userData.data.lastClaimed); // Assumes lastClaimed is a timestamp in milliseconds.
            const now = moment(); //Gets current time in the system's default timezone

            //Consider adding timezone specification for better accuracy:
            //const now = moment.tz("America/New_York"); // Replace with your desired timezone

            const diffHours = now.diff(lastClaimed, 'hours');


            // 3. Check if 24 hours have passed
            if (diffHours >= 24) {
                const newBalance = userData.money + dailyReward;
                userData.money = newBalance;
                userData.data.lastClaimed = now.valueOf(); // Store as milliseconds
                await usersData.set(senderID, userData);
                sendMessage(api, {
                    threadID,
                    message: `You claimed your daily reward of $${dailyReward}! Your new balance is $${newBalance}`,
                });
            } else {
                const remainingHours = Math.ceil(24 - diffHours);
                sendMessage(api, {
                    threadID,
                    message: `You've already claimed your daily reward. Come back in ${remainingHours} hours!`,
                });
            }
        } catch (error) {
            console.error("Error claiming daily reward:", error);
            sendMessage(api, {
                threadID,
                message: `An error occurred while claiming your daily reward. Please contact support.`, //Avoid revealing error details to users.
            });
        }
    },
};
                        
