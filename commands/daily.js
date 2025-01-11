const { DateTime } = require('luxon'); //Requires Luxon library for better date/time handling

module.exports = {
    name: 'daily',
    description: 'Claim your daily reward.',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage, usersData) => {
        const { senderID, threadID } = event;
        const dailyReward = 1000;

        try {
            //1. Retrieve user data, create if doesn't exist
            let userData = await usersData.get(senderID);
            if (!userData) {
                userData = { money: 0, data: { lastClaimed: 0 } };
                await usersData.set(senderID, userData);
                console.log(`Created new user data for ${senderID}`);
            }

            //2. Use Luxon for precise time comparison
            const lastClaimed = DateTime.fromMillis(userData.data.lastClaimed);
            const now = DateTime.now();
            const diff = now.diff(lastClaimed, 'hours').hours;

            //3. Check if 24 hours have passed
            if (diff >= 24) {
                const newBalance = userData.money + dailyReward;
                userData.money = newBalance;
                userData.data.lastClaimed = now.toMillis();
                await usersData.set(senderID, userData);
                sendMessage(api, {
                    threadID,
                    message: `You claimed your daily reward of $${dailyReward}! Your new balance is $${newBalance}`,
                });
            } else {
                const timeUntilNextClaim = DateTime.fromMillis(lastClaimed.plus({ hours: 24 }).toMillis()).diffNow('hours').negate().hours;
                sendMessage(api, {
                    threadID,
                    message: `You've already claimed your daily reward. Come back in ${Math.ceil(timeUntilNextClaim)} hours!`,
                });
            }
        } catch (error) {
            console.error("Error claiming daily reward:", error);
            sendMessage(api, {
                threadID,
                message: `An error occurred while claiming your daily reward. Please contact support and provide this error code: ${error.message}`,
            });
        }
    },
};
