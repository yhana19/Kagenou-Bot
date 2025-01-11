const langData = require('../lang/lang.json'); // Path to your language file

module.exports = {
    name: 'slot',
    description: 'Play a slot machine game.',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage, usersData) => {
        const { senderID, threadID } = event;
        const amount = parseInt(args[1]);
        const lang = 'en'; // Default language.  Improve this to detect user language.

        if (isNaN(amount) || amount <= 0) {
            return sendMessage(api, { threadID, message: langData[lang].invalid_amount });
        }

        const userData = await usersData.get(senderID) || { money: 0, data: {} };

        if (amount > userData.money) {
            return sendMessage(api, { threadID, message: langData[lang].not_enough_money });
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

        const messageText = getSpinResultMessage(slot1, slot2, slot3, winnings, langData[lang]);

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

function getSpinResultMessage(slot1, slot2, slot3, winnings, langData) {
    if (winnings > 0) {
        if (slot1 === slot2 && slot2 === slot3) {
            return sprintf(langData.jackpot_message, winnings, slot1) + ` [${slot1} | ${slot2} | ${slot3}]`;
        } else {
            return sprintf(langData.two_match, winnings) + ` [${slot1} | ${slot2} | ${slot3}]`;
        }
    } else {
        return sprintf(langData.lose_message, -winnings) + ` [${slot1} | ${slot2} | ${slot3}]`;
    }
}

//Helper function for string formatting
function sprintf(str, ...args){
    return str.replace(/%(\d+)/g, (match, index) => args[index-1] || '');
                                       }
                       
