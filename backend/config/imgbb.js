const axios = require('axios');
const FormData = require('form-data');

// ImgBB API configuration
// Set IMGBB_API_KEY in your environment variables
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

async function uploadToImgBB(fileBuffer, filename) {
  try {
    if (!IMGBB_API_KEY) {
      throw new Error('IMGBB_API_KEY environment variable is not set');
    }

    const formData = new FormData();
    formData.append('image', fileBuffer.toString('base64'));
    formData.append('name', filename.split('.')[0]); // Remove extension from name

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      formData,
      {
        headers: {
          ...formData.getHeaders()
        }
      }
    );

    if (response.data.success) {
      console.log('✅ ImgBB upload successful:', response.data.data.url);
      return response.data.data.url; // Returns the permanent image URL
    } else {
      throw new Error('ImgBB upload failed');
    }
  } catch (error) {
    console.error('❌ ImgBB upload error:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { uploadToImgBB };
