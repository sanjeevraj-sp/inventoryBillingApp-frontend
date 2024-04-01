import blobUtil from 'blob-util';

const getImageMimeType = async (imageData) => {
    const blob = blobUtil.createBlob([imageData]);
    const mimeType = await blobUtil.getMimeType(blob);
    return mimeType;
};