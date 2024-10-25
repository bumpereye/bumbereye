// rabbitmq.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private client: ClientProxy;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const rabbitmqUrl = this.configService.get('MESSAGE_BROKER_URL');

    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [rabbitmqUrl],
        queue: 'images_queue',
        queueOptions: { durable: true },
      },
    });
  }

  // Send a message to RabbitMQ
  async sendMessage(pattern: string, data: any) {
    console.log('Sending message:', pattern, data);

    await firstValueFrom(this.client.send(pattern, data));
  }

  // Emit an event to RabbitMQ (e.g., for pub/sub patterns)
  emitEvent(pattern: string, data: any) {
    return this.client.emit(pattern, data);
  }
}
