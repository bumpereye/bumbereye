import { Injectable } from '@nestjs/common';
import { RabbitMQService } from 'src/integrations/rabbitmq/rabbitmq.service';
import { ConfigService } from '@nestjs/config';
import { imageQueueName } from './constants';
import { ImageEvents } from './types/image-events.types';

@Injectable()
export class ImageService extends RabbitMQService {
  constructor(protected readonly configService: ConfigService) {
    super(configService, imageQueueName);
  }

  async uploadImage(file: Express.Multer.File, metadata: Record<string, any>) {
    const fileData = file.buffer.toString('base64');

    const message = {
      filename: file.originalname,
      mimetype: file.mimetype,
      data: fileData,
      metadata,
    };

    await this.sendMessage(ImageEvents.UPLOAD_IMAGE, message);
  }
}
