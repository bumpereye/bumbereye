import { StorageService } from './storage/storage.service';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

const eventName = 'UPLOAD_IMAGE';

@Controller()
export class AppController {
  constructor(private readonly storageService: StorageService) {}

  @MessagePattern(eventName)
  async handleMessage(message: any) {
    await this.storageService.uploadFile(message);

    return { message: 'Image uploaded successfully' };
  }
}
