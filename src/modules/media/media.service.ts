import { Upload } from "@aws-sdk/lib-storage";

import { Injectable } from "@nestjs/common";

import { UploadFileDto } from "./dtos/upload-file.dto";

import { ConfigurationService } from "@infrastructure/configuration/services/configuration.service";

import MESSAGES from "@helpers/messages/http-messages";

@Injectable()
export class MediaService {
  constructor(private configService: ConfigurationService) {}

  async uploadFile({ file, path }: UploadFileDto): Promise<{ url: string }> {
    const upload = await new Upload({
      client: this.configService.awsConfig.S3.client,
      params: {
        Bucket: this.configService.awsConfig.S3.awsBucketName,
        Key: `${path}/${file.name}`,
        Body: file.buffer,
        ACL: "public-read",
      },
    }).done();
    if (upload.Location) return { url: upload.Location };
    throw new Error(MESSAGES.S3_ERROR);
  }

  async deleteFile(file: string): Promise<void> {
    await this.configService.awsConfig.S3.client.deleteObject({
      Bucket: this.configService.awsConfig.S3.awsBucketName,
      Key: file,
    });
  }
}
