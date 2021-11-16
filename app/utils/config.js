import dotenv from 'dotenv';
dotenv.config()

import aws from 'aws-sdk';

aws.config.update({
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    region:process.env.AWS_REGION,
    sessionToken:process.env.AWS_TOKEN
});

const s3 = new aws.S3();
export default s3;