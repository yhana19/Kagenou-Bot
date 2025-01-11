module.exports = {
    name: 'daily',
    description: 'Claim your daily reward.',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage, usersData) => {
        const { senderID, threadID } = event;
        const dailyReward = 1000;

        try {
            const userData = await usersData.get(senderID);
            if (!userData) {
                // Handle the case where the user's data is not found
                console.error(`User data not found for ${senderID}`);
                return sendMessage(api, { threadID, message: "Your user data was not found. Please contact an admin." });
            }

            const lastClaimed = userData.data?.lastClaimed || 0; // Use optional chaining
            const now = Date.now();
            const oneDay = 24 * 60 * 60 * 1000;

            if (now - lastClaimed >= oneDay) {
                const newBalance = userData.money + dailyReward;
                await usersData.set(senderID, { ...userData, money: newBalance, data: { ...userData.data, lastClaimed: now } });
                sendMessage(api, {
                    threadID,
                    message: `You claimed your daily reward of $${dailyReward}! Your new balance is $${newBalance}`,
                });
            } else {
                const timeLeft = Math.floor((lastClaimed + oneDay - now) / 1000);
                const seconds = timeLeft % 60;
                const minutes = Math.floor(timeLeft / 60) % 60;
                const hours = Math.floor(timeLeft / (60 * 60));
                sendMessage(api, {
                    threadID,
                    message: `You've already claimed your daily reward. Come back in ${hours} hours, ${minutes} minutes, and ${seconds} seconds!`,
                });
            }
        } catch (error) {
            console.error("Error claiming daily reward:", error); // Log the error for debugging
            sendMessage(api, {
                threadID,
                message: `An error occurred while claiming your daily reward.  Please contact an admin and provide this error code: ${error.message}`, // More informative error message
            });            
        }
    },
};
                    
