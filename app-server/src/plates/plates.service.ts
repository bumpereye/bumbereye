import { Injectable } from '@nestjs/common';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

const eventName = 'UPLOAD_IMAGE';

@Injectable()
export class PlatesService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async sendImageToQueue(file: Express.Multer.File) {
    const fileData = file.buffer.toString('base64');

    const message = {
      filename: file.originalname,
      mimetype: file.mimetype,
      data: fileData,
    };

    await this.rabbitMQService.sendMessage(eventName, message);
  }
}
