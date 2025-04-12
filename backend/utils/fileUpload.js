const fs = require('fs');
const path = require('path');
const cloudinary = require('../config/cloudinary');

/**
 * Safely delete a file if it exists
 * @param {string} filePath - Path to the file to delete
 * @returns {boolean} - Whether the file was deleted
 */
const safelyDeleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Temporary file deleted: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error deleting temporary file ${filePath}:`, error);
    return false;
  }
};

/**
 * Upload a file to Cloudinary
 * @param {string} filePath - Path to the file to upload
 * @param {string} folder - Cloudinary folder to upload to
 * @returns {Object} - Upload result
 */
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
    
    // Delete the temporary file after successful upload
    safelyDeleteFile(filePath);
    
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
    safelyDeleteFile(filePath);
    
    console.error('Error uploading file to Cloudinary:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Upload multiple files to Cloudinary
 * @param {Array<string>} filePaths - Array of file paths to upload
 * @param {string} folder - Cloudinary folder to upload to
 * @returns {Object} - Upload results
 */
const uploadMultipleFiles = async (filePaths, folder = 'urban_aid') => {
  try {
    const uploadPromises = filePaths.map(filePath => uploadFile(filePath, folder));
    const results = await Promise.all(uploadPromises);
    
    // Additional safety check to ensure all temp files are deleted
    filePaths.forEach(safelyDeleteFile);
    
    return {
      success: true,
      files: results
    };
  } catch (error) {
    // Try to clean up all files in case of error
    filePaths.forEach(safelyDeleteFile);
    
    console.error('Error uploading multiple files to Cloudinary:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - Cloudinary public ID of the file to delete
 * @returns {Object} - Delete result
 */
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

/**
 * Cleanup old temporary files from the uploads folder
 * @param {number} maxAgeMinutes - Maximum age of files in minutes
 * @returns {Object} - Cleanup result
 */
const cleanupUploadsFolder = (maxAgeMinutes = 60) => {
  try {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      return {
        success: true,
        message: 'Uploads directory does not exist',
        deletedFiles: 0
      };
    }
    
    const files = fs.readdirSync(uploadsDir);
    const now = Date.now();
    let deletedCount = 0;
    
    files.forEach(file => {
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);
      
      // Check if file is older than maxAgeMinutes
      const fileAgeMinutes = (now - stats.mtime.getTime()) / (1000 * 60);
      
      if (fileAgeMinutes > maxAgeMinutes) {
        if (safelyDeleteFile(filePath)) {
          deletedCount++;
        }
      }
    });
    
    return {
      success: true,
      message: `Deleted ${deletedCount} old files from uploads folder`,
      deletedFiles: deletedCount
    };
  } catch (error) {
    console.error('Error cleaning up uploads folder:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  uploadFile,
  uploadMultipleFiles,
  deleteFile,
  cleanupUploadsFolder,
  safelyDeleteFile
};
