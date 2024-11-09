import { OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

export class RabbitMQService implements OnModuleInit {
  private client: ClientProxy;

  constructor(
    protected readonly configService: ConfigService,
    protected readonly queueName: string,
  ) {}

  onModuleInit() {
    const rabbitmqUrl = this.configService.get('MESSAGE_BROKER_URL');

    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [rabbitmqUrl],
        queue: this.queueName,
        queueOptions: { durable: true },
      },
    });
  }

  async sendMessage(pattern: string, data: any) {
    await firstValueFrom(this.client.send(pattern, data));
  }

  emitEvent(pattern: string, data: any) {
    return this.client.emit(pattern, data);
  }
}
