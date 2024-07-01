import {v2 as cloudinary, UploadApiResponse} from 'cloudinary';
import {v4 as uuid} from 'uuid';

const getBase64 = (file: Express.Multer.File) => `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

// export const uploadFilesToCLoudinary = async(files : Express.Multer.File[]): Promise<{ public_id: string, url: string }[]> => {
//     const uploadPromises = files.map((file)=>{
//         return new Promise<UploadApiResponse>((resolve, reject)=>{
//             cloudinary.uploader.upload(
//                 getBase64(file),{
//                     resource_type: "auto",
//                     public_id: uuid(),
//                 },
//                 (error, result) => {
//                     if(error) return reject(error);
//                     resolve(result!);
//                 }
//             )
//         })
//     });

//     try{
//         const results = await Promise.all(uploadPromises);

//         const formattedResults = results.map((result: UploadApiResponse)=>({
//             public_id: result.public_id,
//             url: result.secure_url,
//         }))

//         return formattedResults;
//     } catch(error){
//         throw new Error("Error uploading files to cloudinary");
//     }
// }

// export const uploadFilesToCloudinary = async (files:any[]) => {
//     const uploadPromises = files.map((file)=>{
//         return new Promise((resolve, reject) => {
//            cloudinary.uploader.upload(
//                 getBase64(file),
//                 {
//                     resource_type: "auto",
//                     public_id: uuid(),
//                 },
//                 (error, result) => {
//                     if(error) return reject(error);
//                     resolve(result);
//                 }
//             )
//         })
//     });

//     try {
//         const results = await Promise.all(uploadPromises);

//         const formattedResults = results.map((result: any) => ({
//             public_id: result.public_id,
//             url: result.secure_url,
//         }))

//         return formattedResults;

//     } catch (error) {
//         throw new Error("Error uploading files to cloudinary");
//     }
// }

export const uploadFilesToCloudinary = async (files: Express.Multer.File[]): Promise<{ public_id: string, url: string }[]> => {
    const uploadPromises = files.map((file) => {
        return new Promise<UploadApiResponse>((resolve, reject) => {
            cloudinary.uploader.upload(
                getBase64(file),
                {
                    resource_type: "auto",
                    public_id: uuid(),
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        return reject(error);
                    }
                    resolve(result!);
                }
            );
        });
    });

    try {
        const results = await Promise.all(uploadPromises);

        const formattedResults = results.map((result: UploadApiResponse) => ({
            public_id: result.public_id,
            url: result.secure_url,
        }));

        return formattedResults;
    } catch (error) {
        console.error("Error uploading files to Cloudinary:", error);
        throw new Error("Error uploading files to Cloudinary");
    }
};