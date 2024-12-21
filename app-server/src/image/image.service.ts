import { Injectable } from '@nestjs/common';
import { RabbitMQService } from 'src/integrations/rabbitmq/rabbitmq.service';
import { ConfigService } from '@nestjs/config';
import { imageQueueName } from './constants';
import { ImageEvents } from './enums/image-events.enum';
import { Readable } from 'stream';

@Injectable()
export class ImageService extends RabbitMQService {
  constructor(protected readonly configService: ConfigService) {
    super(configService, imageQueueName);
  }

  isSaveEnabled(): boolean {
    return this.configService.get<boolean>('IMAGE_SAVE_ENABLED');
  }

  async uploadImage(
    file: Express.Multer.File,
    metadata: Record<string, any>,
  ): Promise<void> {
    if (!this.isSaveEnabled()) {
      return;
    }

    const fileStream = Readable.from(file.buffer);

    let data = '';
    for await (const chunk of fileStream) {
      data += chunk.toString('base64');
    }

    const message = {
      filename: file.originalname,
      mimetype: file.mimetype,
      data,
      metadata,
    };

    await this.sendMessage(ImageEvents.UPLOAD_IMAGE, message);
  }
}
