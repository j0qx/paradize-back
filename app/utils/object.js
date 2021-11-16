import s3 from './config';

const getUrl = async (bucketName,key) => {

    const params = {
        Bucket:bucketName,
        Key:key
    };

    let result = await s3.getSignedUrl('getObject',params).promise();

    result = result.split('?')[0];

    return result;
    
};

export default getUrl