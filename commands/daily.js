module.exports = {
    name: 'daily',
    description: 'Claim your daily reward.',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage, usersData, getLang) => {
        const { senderID, threadID } = event;
        const dailyReward = 100; //amount of daily reward money

        try {
            const userData = await usersData.get(senderID) || { money: 0, data: {} };
            const lastClaimed = userData.data.lastClaimed || 0; //last claim time
            const now = Date.now();
            const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

            if (now - lastClaimed >= oneDay) {
                const newBalance = userData.money + dailyReward;
                await usersData.set(senderID, {
                    money: newBalance,
                    data: { ...userData.data, lastClaimed: now }, //update claim time
                });
                sendMessage(api, {
                    threadID,
                    message: `You claimed your daily reward of $${dailyReward}! Your new balance is $${newBalance}`,
                });
            } else {
                const timeLeft = Math.floor((lastClaimed + oneDay - now) / 1000); //time left until next claim
                const seconds = timeLeft % 60;
                const minutes = Math.floor(timeLeft / 60) % 60;
                const hours = Math.floor(timeLeft / (60 * 60));
                sendMessage(api, {
                    threadID,
                    message: `You've already claimed your daily reward. Come back in ${hours} hours, ${minutes} minutes, and ${seconds} seconds!`,
                });
            }
        } catch (error) {
            console.error("Error claiming daily reward:", error);
            sendMessage(api, { threadID, message: "An error occurred while claiming your daily reward." });
        }
    },
};
