const axios = require('axios');

module.exports = {
  name: 'pinterest',
  description: 'Fetch images from Pinterest',
  author: 'coffee',
  usage: 'pinterest <search term> <number of images (1-10)>',
  async execute(api, event, args, commands, prefix, admins, appState, sendMessage) {
    const { threadID, senderID } = event;

    if (!args || args.length < 1) {
      return sendMessage(api, { threadID, message: '📷 | Please use this format:\npinterest cat 1-10' });
    }

    const searchTerm = args[0];
    let numImages = parseInt(args[1]) || 1;
    numImages = Math.abs(numImages);
    numImages = Math.min(numImages, 10);
    numImages = Math.max(numImages, 1);

    const apiUrl = `https://pin-kshitiz.vercel.app/pin?search=${encodeURIComponent(searchTerm)}`;

    try {
      const { data } = await axios.get(apiUrl);
      const images = data.result.slice(0, numImages);
      if (images.length > 0) {
        for (const imageUrl of images) {
          await sendMessage(api, { threadID, attachment: { type: 'image', payload: { url: imageUrl } } });
        }
      } else {
        await sendMessage(api, { threadID, message: 'No images found for your search.' });
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      await sendMessage(api, { threadID, message: 'Error: Unable to fetch images from Pinterest.' });
    }
  },
};
