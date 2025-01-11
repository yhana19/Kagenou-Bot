module.exports = {
    name: 'scatter',
    description: 'Play a scatter machine game.',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage, usersData, getLang) => {
        const { senderID, threadID } = event;
        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount <= 0) {
            return sendMessage(api, { threadID, message: getLang("invalid_amount") });
        }

        const userData = await usersData.get(senderID) || { money: 0, data: {} };

        if (amount > userData.money) {
            return sendMessage(api, { threadID, message: getLang("not_enough_money") });
        }

        const slots = ["🔴", "🟡", "🔵", "🟢", "⚪", "🟣"];
        const slot1 = slots[Math.floor(Math.random() * slots.length)];
        const slot2 = slots[Math.floor(Math.random() * slots.length)];
        const slot3 = slots[Math.floor(Math.random() * slots.length)];

        const winnings = calculateWinnings(slot1, slot2, slot3, amount);

        await usersData.set(senderID, {
            money: userData.money + winnings,
            data: userData.data,
        });

        const messageText = getSpinResultMessage(slot1, slot2, slot3, winnings, getLang);

        sendMessage(api, { threadID, message: messageText });
    },
};

function calculateWinnings(slot1, slot2, slot3, betAmount) {
    if (slot1 === slot2 && slot2 === slot3) {
        return betAmount * 10;
    } else if (slot1 === slot2 || slot1 === slot3 || slot2 === slot3) {
        return betAmount * 2;
    } else {
        return -betAmount;
    }
}

function getSpinResultMessage(slot1, slot2, slot3, winnings, getLang) {
    if (winnings > 0) {
        if (slot1 === slot2 && slot2 === slot3) {
            return getLang("jackpot_message", winnings, slot1) + ` [${slot1} | ${slot2} | ${slot3}]`;
        } else {
            return getLang("two_match", winnings) + ` [${slot1} | ${slot2} | ${slot3}]`;
        }
    } else {
        return getLang("lose_message", -winnings) + ` [${slot1} | ${slot2} | ${slot3}]`;
    }
          }
