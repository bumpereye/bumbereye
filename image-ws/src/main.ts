import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const rabbitMQUrl =
    process.env.MESSAGE_BROKER_URL || 'amqp://user:password@localhost:5672';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMQUrl],
        queue: 'images_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  app.listen();
}
bootstrap();
