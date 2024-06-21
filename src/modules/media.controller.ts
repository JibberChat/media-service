import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { UploadFileDto } from "./dtos/upload-file.dto";
import { MediaService } from "./media.service";

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @MessagePattern({ cmd: "uploadFile" })
  async uploadFile(data: UploadFileDto): Promise<{ url: string }> {
    return await this.mediaService.uploadFile(data);
  }
}
