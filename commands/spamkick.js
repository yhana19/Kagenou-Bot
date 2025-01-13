const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'prefix', 
    category: 'Info', 
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        const { threadID } = event;

        try {
            const jsonData = [{"content":{"url":"https://imgur.com/a/seven-shadows-KKVtWtV.mp4","url_content":"Select ...\nCopy LinkDownload\n1/50\nFull-Sized Dump Of Stolen Memes #006\n86\n6\n3K\ndumpmemesmeme dumpmemefunny\nSelect ...\nCopy LinkDownload\nFirefighters at the Rose Bowl.\n82\n9\n2K\nSelect ...\nCopy LinkDownload\nA cat named Masha…\n107\n18\n6K\n"},"verbose_info":{"file_info":{"name":"file1","url":"https://imgur.com/a/seven-shadows-KKVtWtV.mp4","uri":"file_uri_b79d8525cf55c74b8304dab05661a453","md5":"02ebc89954307667830f710ac31fac13"},"parse_success":true,"total_tokens":78,"read_tokens":78,"meta_file_type":"weblink","meta_page_num":1,"meta_raw_size_kb":0,"meta_parse_size_kb":0}}]; 
            const imgurMp4Link = jsonData[0].content.url;

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

                
