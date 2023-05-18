import { v2 as _cloudinary } from 'cloudinary'

export const cloudinary = () => {
    const config = useRuntimeConfig()

    _cloudinary.config({
        cloud_name: config.cloudinaryName,
        api_key: config.cloudinaryKey,
        api_secret: config.cloudinarySecret
    })

    return _cloudinary
}
export const uploadToCloudinary = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary().uploader.upload(image, (error, data) => {
            if (error) {
                reject(error)
            }
            resolve(data)
        })
    })
}