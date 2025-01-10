module.exports = {
  name: 'help',
  category: 'Info',
  execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
    const { threadID } = event;
    let menuMessage = "====『 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧: 』====\n\n";
    let i = 1;

    // Sort commands alphabetically for consistent ordering
    const sortedCommands = [...commands.entries()].sort((a, b) => a[0].localeCompare(b[0]));

    for (const [commandName, command] of sortedCommands) {
      menuMessage += `  ╭─╮\n  | 『 ${i++}.』  ${commandName}\n  ╰─────────────ꔪ\n`;
    }

    sendMessage(api, { threadID, message: menuMessage });
  },
};
