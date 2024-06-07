import { Controller } from '@nestjs/common';
import { MediaService } from './media.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @MessagePattern({ cmd: 'getMedias' })
  getMedias(): string {
    return this.mediaService.getMedias();
  }
}
