export const getImage = (images) =>{
    return images.length > 0 ? images[0].images : ""
}
export const getImageWithUrl = (image) =>{
    return image ? process.env.REACT_APP_API + image : ""
}

export const getGifWithUrl = (gif) =>{
    return gif ? process.env.REACT_APP_API + gif : ""
}
