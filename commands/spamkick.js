const axios = require('axios');

module.exports = {
    name: 'prefix',
    category: 'Info',
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        const { threadID } = event;
        const currentPrefix = prefix;

        try {
            const response = await axios.get('https://drive.google.com/file/d/1CNXQ7AWkQUpxIbQT3-wRmRPiL1VhS9be/view?usp=drivesdk', { responseType: 'arraybuffer' });
            if (response.status !== 200) {
                throw new Error(`Google Drive returned status code ${response.status}: ${response.statusText}`); // Added statusText
            }
            const imgBuffer = Buffer.from(response.data, 'binary');
            api.sendMessage({ body: `🌐 Global Prefix: \`${currentPrefix}\``, attachment: imgBuffer }, threadID);
        } catch (error) {
            console.error('Error fetching or sending image:', error); // Log the full error
            sendMessage(api, {
                threadID,
                message: `🌐 Global Prefix: \`${currentPrefix}\`\nError displaying image: ${error.message}`,
            });
        }
    },
};

