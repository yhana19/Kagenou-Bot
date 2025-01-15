const axios = require('axios'); // Make sure axios is installed and imported

module.exports = {
  name: 'help',
  category: 'Info',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID } = event;
    let menuMessage = "====『 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧: 』====\n\n";
    let i = 1;

    const sortedCommands = [...commands.entries()].sort((a, b) => a[0].localeCompare(b[0]));

    for (const [commandName, command] of sortedCommands) {
      menuMessage += `  ╭─╮\n  | 『 ${i++}.』  ${commandName}\n  ╰─────────────ꔪ\n`;
    }

    try {
      await sendMessage(api, { threadID, message: menuMessage }); // Send text first

      const imageUrl = "https://imgur.com"; // replace mo lang if gusto, mo may attachment image

      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary');

      await sendMessage(api, { threadID, attachment: imageBuffer, type: 'image' }); // Send image

    } catch (error) {
      console.error("Error sending help message or image:", error);
      await sendMessage(api, { threadID, message: "Error sending help.  Check console logs." });
    }
  },
};
