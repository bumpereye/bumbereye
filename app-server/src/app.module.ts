import { Module } from '@nestjs/common';
import { PlatesModule } from './plates/plates.module';
import { ConfigModule } from '@nestjs/config';
import { PlateRecognitionWsModule } from './plate-recognition-ws/plate-recognition-ws.module';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Module({
  imports: [
    PlatesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PlateRecognitionWsModule,
  ],
  providers: [RabbitMQService],
})
export class AppModule {}
