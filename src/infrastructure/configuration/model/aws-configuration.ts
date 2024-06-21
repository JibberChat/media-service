import type { S3 } from "@aws-sdk/client-s3";

export const AWS_BUCKET_NAME = "AWS_BUCKET_NAME";
export const AWS_REGION = "AWS_REGION";
export const AWS_ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID";
export const AWS_SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY";

export type AWSConfiguration = {
  S3: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    awsBucketName: string;
    client: S3;
  };
};
