const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'prefix', 
    category: 'Info', 
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        const { threadID } = event;

        try {
            const imgurMp4Link = 'https://imgur.com/a/seven-shadows-KKVtWtV.mp4'; // Your Imgur MP4 link

            const tmpFolderPath = path.join(__dirname, 'tmp');
            if (!fs.existsSync(tmpFolderPath)) {
                fs.mkdirSync(tmpFolderPath);
            }

            // Download video
            try {
                const videoResponse = await axios.get(imgurMp4Link, { responseType: 'arraybuffer' });
                console.log("Video response:", videoResponse); // Log the response

                // Save video
                const videoPath = path.join(tmpFolderPath, 'video.mp4');
                console.log("Video path:", videoPath); // Log the video path

                fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

                // Send video
                await api.sendMessage({
                    body: `The bot's prefix is: \`${prefix}\``, 
                    attachment: fs.createReadStream(videoPath) 
                }, threadID);
            } catch (error) {
                console.error('Error downloading or saving video:', error);
                sendMessage(api, { threadID, message: `Error sending video: ${error.message}` });
            }
        } catch (error) {
            console.error('Error processing command:', error);
            sendMessage(api, { threadID, message: `Error sending video: ${error.message}` });
        }
    },
};
            
