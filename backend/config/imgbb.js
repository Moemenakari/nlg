const axios = require('axios');

// ImgBB API configuration
// Set IMGBB_API_KEY in your environment variables
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

async function uploadToImgBB(fileBuffer, filename) {
  try {
    if (!IMGBB_API_KEY) {
      console.error('❌ IMGBB_API_KEY environment variable is not set');
      throw new Error('IMGBB_API_KEY environment variable is not set');
    }

    console.log('📤 Starting ImgBB upload (API key configured)');    
    // Convert buffer to base64
    const base64Image = fileBuffer.toString('base64');
    
    // ImgBB expects URL-encoded form data
    const params = new URLSearchParams();
    params.append('image', base64Image);
    params.append('name', filename.split('.')[0]); // Remove extension from name

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );

    if (response.data && response.data.success) {
      console.log('✅ ImgBB upload successful:', response.data.data.url);
      return response.data.data.url; // Returns the permanent image URL
    } else {
      console.error('❌ ImgBB response error:', response.data);
      throw new Error('ImgBB upload failed: ' + JSON.stringify(response.data));
    }
  } catch (error) {
    console.error('❌ ImgBB upload error:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { uploadToImgBB };
