const cloudinary = require('cloudinary').v2;
const fs = require("fs");
require("dotenv").config();

          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET, 
});


const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        //upload file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file has been upload on cloudinary",response)
        fs.unlinkSync(localFilePath) 
        return response;
    }
    catch(error){
        // fs.unlinkSync(localFilePath)
        console.log(error)
         // remove the locally saved temporary file as the upload operation go failed
    }
}

module.exports = uploadOnCloudinary;