import * as aws from "aws-sdk";
import * as Q from "q";

interface IAWSParam {
    accessKeyId: string,
    secretAccessKey: string,
    sessionToken: string,
}

export class S3Provider {
    private static getAWSParam(): IAWSParam {
        return {
            accessKeyId: process.env.AWS_APP_BUCKET_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_APP_BUCKET_SECRET_ACCESS_KEY,
            sessionToken: process.env.AWS_APP_BUCKET_SESSION_TOKEN,
        };
    }

    public static upload(fileName: string, body: any, bucket: string = process.env.AWS_S3_APP_BUCKET) {
        const awsParam = S3Provider.getAWSParam(),
            s3 = new aws.S3(awsParam),
            options = {
                Key: fileName,
                Body: body,//buffer
                Bucket: bucket
            },
            defer = Q.defer();

        s3.upload(options, (error, data) => {
            if (error) {
                console.log("Can not upload data to s3: " + error, options);
                defer.reject(error);
            } else {
                console.log("Upload file successfully");
                defer.resolve(data);
            }
        });

        return defer.promise;
    }
}