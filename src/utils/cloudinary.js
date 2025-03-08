import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';



// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Upload an image

export const uploadOnCloudinary = async (localfilepath) => {
    try {

        if(!localfilepath) return null;

        // Upload image to cloudinary
        const response = await cloudinary.uploader.upload(localfilepath , {
            resource_type: 'auto'
        })

        // file has been uploaded successfully
        console.log('File has been uploaded successfully', response.url)
        return response;
    }

    catch(error){

        // we are using sync because we want to images get removed , then only we will proceed ahead
        fs.unlinkSync(localfilepath);
        console.error('Error uploading file', error);

    }
}


