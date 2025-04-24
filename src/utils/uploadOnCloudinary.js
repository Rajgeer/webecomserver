const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const fs = require("fs");
dotenv.config();

// Configuration

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // secure_distribution: 'mydomain.com',
    // upload_prefix: 'myprefix.com'
  });
exports.uploadOnCloudinary = async(localFilePath) => {
   
    try {
        if(!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto",
            progress: (event, data) => {

                const progressPercentage = Math.round((data.loaded / data.total) * 100);
        
                // Update your progress bar or UI element with progressPercentage
        
                console.log(`Upload progress: ${progressPercentage}%`);
                 return progressPercentage;
            }
        },
        (error, result) => {}
    )
        // file has been upload successfull
        // console.log(`uploaded file url : ${response.url}`);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        // console.log('Error on Cloudinary : ', error);
       fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload 
       return null;
    }
}