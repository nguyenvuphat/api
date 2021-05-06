import * as aws from "aws-sdk";
import * as Q from "q";

interface IAWSParam {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
    region: string;
}

export class SQSProvider {
    constructor() {}

    private static getAWSParam(): IAWSParam {
        return {
            accessKeyId: process.env.AWS_APP_BUCKET_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_APP_BUCKET_SECRET_ACCESS_KEY,
            sessionToken: process.env.AWS_APP_BUCKET_SESSION_TOKEN,
            region: process.env.AWS_APP_BUCKET_REGION
        };
    }

    public static sendMessage(message: any): Promise<any> {
        const awsParam = SQSProvider.getAWSParam();

        let sqs = new aws.SQS(awsParam);

        const defer = Q.defer();

        sqs.sendMessage({
            QueueUrl: process.env.UPLOAD_WORKER_QUEUE_NAME,
            MessageBody: JSON.stringify(message),
        }, (err, data) => {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(data);
            }
        });

        return defer.promise;


        // let sendMessage = Q.nbind(sqs.sendMessage, sqs);
        //
        // return sendMessage({
        //     QueueUrl: process.env.UPLOAD_WORKER_QUEUE_NAME,
        //     MessageBody: JSON.stringify(message),
        // })
    }
}
