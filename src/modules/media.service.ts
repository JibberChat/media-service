import { Injectable } from "@nestjs/common";

import { UploadFileDto } from "./dtos/upload-file.dto";

@Injectable()
export class MediaService {
  getMedias(): string {
    return "Hello World!, Media";
  }

  async uploadFile(data: UploadFileDto): Promise<{ url: string }> {
    console.log(data);
    return { url: "https://www.google.com" };
  }
}
