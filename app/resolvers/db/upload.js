import s3 from '../../utils/config';
import promisify from 'util.promisify';
import {extname} from 'path';


const uploadQueries = {
    fetchBuckets: async () => {

        let result = await s3.listBuckets().promise().catch(console.log);;

        result = result.Buckets.map(result => result.Name);

        return result;

    },

    //fetching objects.
    async fetchObjects(_,{bucketName}){
        
        const params = {
            Bucket:bucketName
        };

        let result = await s3.listObjects(params).promise().catch(console.log);
        console.log('result',result)
        let objects = [];

        result.Contents.forEach( content => {
            console.log(content)
            return objects.push({
                key:content.Key,
                url:getUrl
            })
        } );

        return objects;

    }
}


const uploadMutations = {

    //create a bucket.
    createBucket: async (_,{bucketName}) => {
        
        const params = {
            Bucket:bucketName
        };

        try {
            await s3.createBucket(params).promise().catch(console.log);
        } catch (err) {
            console.log(err)
        }
        return {
            success:true,
            message:"Bucket created successfully."
        };

    },
    

    //upload object.
    uploadObject: async(_,{file,bucketName}) => {

        const params = {
            Bucket:bucketName,
            Key:'',
            Body:'',
            ACL:'public-read'
        };

        let {createReadStream,filename} = await file;

        let fileStream = createReadStream();

        fileStream.on("error", (error) => console.error(error));

        params.Body = fileStream;

        let timestamp = new Date().getTime();

        let file_extension = extname(filename);

        params.Key = `${timestamp}${file_extension}`;

        let result = await s3.upload(params).promise().catch(console.log);;

        let object = {
            key:params.Key,
            url:result.Location
        };

        return object;

    },

    //upload objects.
    uploadObjects: async (_,{files,bucketName}) => {

        let params = {
            Bucket:bucketName,
            Key:'',
            Body:'',
            ACL:'public-read'
        };

        let objects = [];

        for(let i = 0; i < files.length; i++){

            let file = files[i];

            let {createReadStream,filename} = await file;

            let stream = createReadStream();

            stream.on("error", (error) => console.error(error));

            params.Body = stream;

            let timestamp = new Date().getTime();
            
            let file_extension = extname(filename);

            params.Key = `${timestamp}${file_extension}`;


            let result = await s3.upload(params).promise().catch(console.log);;

            objects.push({
                key:params.Key,
                url:result.Location
            });
            
        };

        return objects;

    },

    //delete object.
    deleteObject: async (_,{bucketName,key}) =>{

        const params = {
            Bucket:bucketName,
            Key:key
        };

        let removeObject = promisify(s3.deleteObject);

        await s3.deleteObject(params).promise().catch(console.log);
        
        return {
            success:true,
            message:"Object successfully deleted."
        };

    },

    //delete objects.
    deleteObjects: async (_,{bucketName,objectKeys}) => {

        const params = {
            Bucket:bucketName,
            Delete:{
                Objects:[]
            }
        };

        objectKeys.forEach((objectKey) => params.Delete.Objects.push({
            Key:objectKey
        }));

        let removeObjects = promisify(s3.deleteObjects);

        await s3.deleteObjects(params).promise().catch(console.log);

        return {
            success:true,
            message:"Successfully deleted objects"
        };

    },

    //delete bucket.
    deleteBucket: async (_,{bucketName}) => {

        const params = {
            Bucket:bucketName
        };

        await s3.deleteBucket(params).promise().catch(console.log);

        return {
            success:true,
            message:"Successfully deleted bucket"
        }

    }

};

export {
    uploadQueries,
    uploadMutations
}