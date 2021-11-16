import dotenv from 'dotenv';
dotenv.config()

import aws from 'aws-sdk';

aws.config.update({
    secretAccessKey:process.env.aws_secret_access_key,
    accessKeyId:process.env.aws_access_key_id,
    sessionToken:process.env.aws_session_token,
    region:process.env.AWS_REGION,
});

const s3 = new aws.S3();
export default s3;