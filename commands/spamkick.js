const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'prefix', 
    category: 'Info', 
    execute: async (api, event, args, commands, prefix, admins, appState, sendMessage) => {
        const { threadID } = event;

        try {
            const jsonData = [{"content":{"url":"https://imgur.com/a/seven-shadows-KKVtWtV.mp4","url_content":"Select ...\nCopy LinkDownload\n1/50\nFull-Sized Dump Of Stolen Memes #006\n86\n6\n3K\ndumpmemesmeme dumpmemefunny\nSelect ...\nCopy LinkDownload\nFirefighters at the Rose Bowl.\n82\n9\n2K\nSelect ...\nCopy LinkDownload\nA cat named Masha…\n107\n18\n6K\n"},"verbose_info":{"file_info":{"name":"file1","url":"https://imgur.com/a/seven-shadows-KKVtWtV.mp4","uri":"file_uri_b79d8525cf55c74b8304dab05661a453","md5":"02ebc89954307667830f710ac31fac13"},"parse_success":true,"total_tokens":78,"read_tokens":78,"meta_file_type":"weblink","meta_page_num":1,"meta_raw_size_kb":0,"meta_parse_size_kb":0}}]; // Replace with the actual JSON data you have
            const imgurMp4Link = jsonData[0].content.url;

            const tmpFolderPath = path.join(__dirname, 'tmp');
            if (!fs.existsSync(tmpFolderPath)) {
                fs.mkdirSync(tmpFolderPath);
            }

            const videoResponse = await axios.get(imgurMp4Link, { responseType: 'arraybuffer' });
            const videoPath = path.join(tmpFolderPath, 'video.mp4');
            fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

            await api.sendMessage({
                body: `🌐 System Prefix: \`${prefix}\``, // Send the prefix in the message body
                attachment: fs.createReadStream(videoPath) 
            }, threadID);
        } catch (error) {
            console.error('Error fetching or sending video:', error);
            sendMessage(api, { threadID, message: `Error sending video: ${error.message}` });
        }
    },
};
                                                                                                                                                                                                                                                                                                                                                                                               
