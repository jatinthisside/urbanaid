const fs = require('fs');
const path = require('path');
const cloudinary = require('../config/cloudinary');

const uploadFile = async (filePath, folder = 'urbanaid') => {
  try {
    if (!fs.existsSync(filePath)) {
      return {
        success: false,
        error: 'File not found'
      };
    }

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'auto'
    });
    
    // Delete the temporary file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    return {
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      format: uploadResult.format,
      resource_type: uploadResult.resource_type,
      result: uploadResult
    };
  } catch (error) {
    // Delete the temporary file on error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    console.error('Error uploading file to Cloudinary:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

const uploadMultipleFiles = async (filePaths, folder = 'urban_aid') => {
  try {
    const uploadPromises = filePaths.map(filePath => uploadFile(filePath, folder));
    const results = await Promise.all(uploadPromises);
    
    return {
      success: true,
      files: results
    };
  } catch (error) {
    console.error('Error uploading multiple files to Cloudinary:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

const deleteFile = async (publicId) => {
  try {
    if (!publicId) {
      return {
        success: false,
        error: 'Public ID is required'
      };
    }
    
    const deleteResult = await cloudinary.uploader.destroy(publicId);
    
    return {
      success: true,
      result: deleteResult
    };
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  uploadFile,
  uploadMultipleFiles,
  deleteFile
};
